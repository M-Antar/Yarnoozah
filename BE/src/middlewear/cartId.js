import { randomUUID } from "crypto";

export const cartId = (req, res, next) => {
  let id = req.headers["x-cart-id"];

  if (!id || typeof id !== "string" || id.trim() === "") {
    id = randomUUID();
    res.setHeader("x-cart-id", id); // frontend reads this and stores it for future requests
  }

  req.cartId = id;
  next();
};