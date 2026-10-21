import { Router } from "express";
import { asyncErrorHandler } from "../../err/index.js";
import { isvalid } from "../../middlewear/validation.middlewear.js";

import {
  addCartItemSchema,
  updateCartItemSchema,
  cartItemParamsSchema,
} from "./cart.validation.js";
import {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "./cart.service.js";
import { cartId } from "../../middlewear/cartId.js";

export const cartRouter = new Router();
cartRouter.use(cartId);

cartRouter.get("/", asyncErrorHandler(getCart));
cartRouter.post("/items", isvalid(addCartItemSchema), asyncErrorHandler(addCartItem));
cartRouter.put(
  "/items/:id",
  isvalid(cartItemParamsSchema),
  isvalid(updateCartItemSchema),
  asyncErrorHandler(updateCartItem)
);
cartRouter.delete("/items/:id", isvalid(cartItemParamsSchema), asyncErrorHandler(removeCartItem));
cartRouter.delete("/", asyncErrorHandler(clearCart));