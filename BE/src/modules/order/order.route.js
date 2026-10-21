import { Router } from "express";
import { asyncErrorHandler } from "../../err/index.js";
import { isvalid } from "../../middlewear/validation.middlewear.js";

import { createOrderSchema, getOrderSchema } from "./order.validation.js";
import { createOrder, getOrder } from "./order.service.js";
import { cartId } from "../../middlewear/cartId.js";

export const orderRouter = new Router();
orderRouter.use(cartId); // optional cartId — used to clear the cart after order success

orderRouter.post("/", isvalid(createOrderSchema), asyncErrorHandler(createOrder));
orderRouter.get("/:id", isvalid(getOrderSchema), asyncErrorHandler(getOrder));