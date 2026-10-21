import { orderRepository } from "../../models/order/order.repository.js";
import { couponRepository } from "../../models/coupon/coupon.repository.js";
import { cartRepository } from "../../models/cart/cart.repository.js";
import { productRepository } from "../../models/product/product.repository.js";
import { calculateShipping } from "../../utils/shipping.js";
import { calculateDiscount } from "../../utils/discount.js";
import { generateOrderNumber } from "../../utils/orderNumber.js";
import { AppError } from "../../err/index.js";
import { Product } from "../../models/product/product.model.js";
import { sendMail } from "../../utils/mail.js";
import { buildOrderEmail } from "../../utils/mail.js";

// put back stock for lines that were already decremented
async function restoreStock(lines) {
  await Promise.all(
    lines.map((l) => productRepository.incrementStock(l.productId, l.quantity))
  );
}

export const createOrder = async (req, res, next) => {
  const decremented = []; // lines whose stock was already reduced

  try {
    const {
      customer,
      shippingAddress,
      items,
      shippingMethod,
      paymentMethod,
      couponCode,
      note,
    } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      throw new AppError("Cart is empty", 400);
    }

    // 1. rebuild every line from DB, never trust client prices
    let subtotal = 0;
    const orderItems = [];

    for (const line of items) {
      const quantity = Number(line.quantity);
      if (!Number.isInteger(quantity) || quantity < 1) {
        throw new AppError("Invalid quantity", 400);
      }

      const product = await Product.findById(line.productId);
      if (!product) throw new AppError(`Product not found: ${line.productId}`, 404);

      const color = product.colors.find((c) => c.id === line.colorId);
      if (!color) throw new AppError(`Invalid color for product: ${product.title}`, 400);

      if (product.stock < quantity) {
        throw new AppError(`Not enough stock for: ${product.title}`, 400);
      }

      subtotal += product.price * quantity;

      orderItems.push({
        productId: product._id,
        title: product.title,
        colorId: color.id,
        colorName: color.name,
        image: color.image,
        price: product.price,
        quantity,
      });
    }

    // 2. coupon, re-validated server-side
    let coupon = null;
    let discount = 0;

    if (couponCode) {
      coupon = await couponRepository.findByCode(couponCode);
      if (!coupon || !coupon.active) throw new AppError("Invalid coupon code", 400);
      if (coupon.expiresAt && coupon.expiresAt < new Date())
        throw new AppError("Coupon has expired", 400);
      if (subtotal < coupon.minSubtotal)
        throw new AppError(`Coupon requires a minimum subtotal of ${coupon.minSubtotal}`, 400);
      if (coupon.usageLimit != null && coupon.usedCount >= coupon.usageLimit)
        throw new AppError("Coupon usage limit reached", 400);

      discount = calculateDiscount(coupon, subtotal);
    }

    const shippingCost = calculateShipping(subtotal, shippingAddress.governorate);
    const total = subtotal - discount + shippingCost;

    // 3. decrement stock; remember each success so we can roll back
    for (const item of orderItems) {
      const result = await productRepository.decrementStock(item.productId, item.quantity);
      if (result.modifiedCount === 0) {
        throw new AppError("Stock changed, please review your cart", 409);
      }
      decremented.push({ productId: item.productId, quantity: item.quantity });
    }

    // 4. create the order
    const order = await orderRepository.create({
      orderNumber: generateOrderNumber(),
      customer,
      shippingAddress,
      items: orderItems,
      shippingMethod: shippingMethod ?? "standard",
      shippingCost,
      paymentMethod,
      couponCode: coupon ? coupon.code : null,
      discount,
      subtotal,
      total,
      note,
    });

    // order exists now, so no rollback from here on
    decremented.length = 0;

    // 5. non-critical steps must never fail the order
    if (coupon) {
      await couponRepository.incrementUsage(coupon._id).catch((e) =>
        console.error(`Order ${order.orderNumber}: coupon usage update failed`, e.message)
      );
    }

    if (req.cartId) {
      await cartRepository.clear(req.cartId).catch((e) =>
        console.error(`Order ${order.orderNumber}: cart clear failed`, e.message)
      );
    }

    if (customer?.email) {
      try {
        const { subject, html, text } = buildOrderEmail(order);
        await sendMail({ to: customer.email, subject, html, text });
      } catch (e) {
        console.error(`Order ${order.orderNumber}: confirmation email failed`, e.message);
      }
    }

    res.status(201).json({
      orderId: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      subtotal: order.subtotal,
      shipping: order.shippingCost,
      discount: order.discount,
      total: order.total,
    });
  } catch (err) {
    // anything that failed before the order was saved: give the stock back
    if (decremented.length) {
      await restoreStock(decremented).catch((e) =>
        console.error("Stock rollback failed", e.message)
      );
    }
    next(err);
  }
};

export const getOrder = async (req, res, next) => {
  const order = await orderRepository.findByIdOrOrderNumber(req.params.id);
  if (!order) {
    throw new AppError("Order not found", 404);
  }
  res.status(200).json(order);
};