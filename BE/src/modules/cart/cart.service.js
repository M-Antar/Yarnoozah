import { cartRepository } from "../../models/cart/cart.repository.js";
import { AppError } from "../../err/index.js";
import { Product } from "../../models/product/product.model.js";

const buildCartResponse = async (cart) => {
  let subtotal = 0;

  const items = await Promise.all(
    cart.items.map(async (item) => {
      const product = await Product.findById(item.productId).lean();
      if (!product) return null;

      const color = product.colors.find((c) => c.id === item.colorId);
      const lineTotal = product.price * item.quantity;
      subtotal += lineTotal;

      return {
        id: item._id,
        productId: product._id,
        title: product.title,
        slug: product.slug,
        price: product.price,
        image: product.images?.[0] ?? null,
        colorId: item.colorId,
        colorName: color?.name ?? null,
        quantity: item.quantity,
        stock: product.stock,
        lineTotal,
      };
    })
  );

  return { cartId: cart.cartId, items: items.filter(Boolean), subtotal };
};

export const getCart = async (req, res, next) => {
  const cart = await cartRepository.findOrCreate(req.cartId);
  res.status(200).json(await buildCartResponse(cart));
};

export const addCartItem = async (req, res, next) => {
  const { productId, colorId, quantity } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    throw new AppError("Product not found", 404);
  }

  const colorExists = product.colors.some((c) => c.id === colorId);
  if (!colorExists) {
    throw new AppError("Invalid color for this product", 400);
  }

  if (product.stock < quantity) {
    throw new AppError("Not enough stock", 400);
  }

  const cart = await cartRepository.addItem(req.cartId, { productId, colorId, quantity });
  res.status(201).json(await buildCartResponse(cart));
};

export const updateCartItem = async (req, res, next) => {
  const { quantity } = req.body;

  if (quantity > 0) {
    const existing = await cartRepository.model.findOne({ cartId: req.cartId });
    const item = existing?.items.id(req.params.id);
    if (item) {
      const product = await Product.findById(item.productId);
      if (product && product.stock < quantity) {
        throw new AppError("Not enough stock", 400);
      }
    }
  }

  const cart = await cartRepository.updateItemQuantity(req.cartId, req.params.id, quantity);
  if (!cart) {
    throw new AppError("Cart or item not found", 404);
  }
  res.status(200).json(await buildCartResponse(cart));
};

export const removeCartItem = async (req, res, next) => {
  const cart = await cartRepository.removeItem(req.cartId, req.params.id);
  if (!cart) {
    throw new AppError("Cart or item not found", 404);
  }
  res.status(200).json(await buildCartResponse(cart));
};

export const clearCart = async (req, res, next) => {
  const cart = await cartRepository.clear(req.cartId);
  res.status(200).json(await buildCartResponse(cart));
};