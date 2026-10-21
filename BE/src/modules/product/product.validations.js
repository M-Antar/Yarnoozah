import Joi from "joi";

const colorSchema = Joi.object({
  name: Joi.string().trim().required(),
  hex: Joi.string().pattern(/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/).required(),
  image: Joi.string().uri().required(),
});

export const createProductSchema = Joi.object({
  title: Joi.string().trim().min(2).max(120).required(),
  slug: Joi.string().trim().lowercase().pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  price: Joi.number().integer().min(0).required(),
  compareAtPrice: Joi.number().integer().min(Joi.ref("price")).allow(null),
  category: Joi.string().hex().length(24).required(),
  description: Joi.string().trim().required(),
  material: Joi.string().trim().allow(""),
  care: Joi.string().trim().allow(""),
  badge: Joi.string().valid("NEW", "SALE", "BESTSELLER").allow(null, ""),
  colors: Joi.array().items(colorSchema).default([]),
  images: Joi.array().items(Joi.string().uri()).min(1).required(),
  stock: Joi.number().integer().min(0).default(0),
  featured: Joi.boolean().default(false),
});