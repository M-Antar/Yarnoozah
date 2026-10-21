import joi from "joi";

const phone = joi.string().pattern(/^01[0-9]{9}$/).required();

export const createOrderSchema = joi.object({
  customer: joi.object({
    email: joi.string().email().required(),
    phone,
    firstName: joi.string().required(),
    lastName: joi.string().required(),
  }).required(),

  shippingAddress: joi.object({
    street: joi.string().required(),
    apartment: joi.string().allow(""),
    governorate: joi.string().required(),
    area: joi.string().required(),
    phone,
  }).required(),

  items: joi.array().items(
    joi.object({
      productId: joi.string().hex().length(24).required(),
      colorId: joi.string().required(),
      quantity: joi.number().integer().min(1).required(),
    })
  ).min(1).required(),

  shippingMethod: joi.string(),
  paymentMethod: joi.string().valid("cod", "card", "instapay").required(),
  couponCode: joi.string().allow(null, ""),
  note: joi.string().allow(""),
}).unknown(true);

export const getOrderSchema = joi.object({
  id: joi.string().required(), // ObjectId or orderNumber
});