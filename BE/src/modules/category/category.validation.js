import joi from "joi";

export const getCategorySchema = joi.object({
  slug: joi.string().required(),
});

export const createCategorySchema = joi.object({
  name: joi.string().trim().min(2).max(80).required(),
  slug: joi.string()
    .trim()
    .lowercase()
    .pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: joi.string().trim().allow(""),
  image: joi.string().uri().required(),
});