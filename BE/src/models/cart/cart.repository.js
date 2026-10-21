import { AbstractRepository } from "../abstractRepository.js";
import { Cart } from "./cart.model.js";

class CartRepository extends AbstractRepository {
  constructor() {
    super(Cart);
  }

  // GET /api/cart — find existing, or create empty if new
  async findOrCreate(cartId) {
    let cart = await this.model.findOne({ cartId });
    if (!cart) {
      cart = await this.model.create({ cartId, items: [] });
    }
    return cart;
  }

  // POST /api/cart/items — merge same product+color, else push new line
  async addItem(cartId, { productId, colorId, quantity }) {
    const cart = await this.findOrCreate(cartId);
    const existing = cart.items.find(
      (i) => String(i.productId) === String(productId) && i.colorId === colorId
    );

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({ productId, colorId, quantity });
    }

    await cart.save();
    return cart;
  }

  // PUT /api/cart/items/:id — 0 removes
  async updateItemQuantity(cartId, itemId, quantity) {
    const cart = await this.model.findOne({ cartId });
    if (!cart) return null;

    const item = cart.items.id(itemId);
    if (!item) return null;

    if (quantity <= 0) {
      item.deleteOne();
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    return cart;
  }

  // DELETE /api/cart/items/:id
  async removeItem(cartId, itemId) {
    const cart = await this.model.findOne({ cartId });
    if (!cart) return null;

    cart.items.id(itemId)?.deleteOne();
    await cart.save();
    return cart;
  }

  // DELETE /api/cart — empty cart
  async clear(cartId) {
    return this.model.findOneAndUpdate({ cartId }, { items: [] }, { new: true });
  }
}

export const cartRepository = new CartRepository();