import joi from "joi";

export const addCartItemSchema = joi.object({
  productId: joi.string().hex().length(24).required(),
  colorId: joi.string().required(),
  quantity: joi.number().integer().min(1).required(),
});

export const updateCartItemSchema = joi.object({
  quantity: joi.number().integer().min(0).required(),
});

export const cartItemParamsSchema = joi.object({
  id: joi.string().hex().length(24).required(),
});