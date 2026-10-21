import { categoryRepository } from "../../models/category/category.repository.js";
import { AppError } from "../../err/index.js";

export const getAllCategories = async (req, res, next) => {
  const categories = await categoryRepository.findAllWithCount();
  res.status(200).json(categories);
};

export const getCategoryBySlug = async (req, res, next) => {
  const category = await categoryRepository.findBySlug(req.params.slug);
  if (!category) {
    throw new AppError("Category not found", 404);
  }
  res.status(200).json(category);
};

const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const createCategory = async (req, res, next) => {
  const data = { ...req.body };

  // slug: provided or derived from name
  data.slug = data.slug || slugify(data.name);
  if (await categoryRepository.findBySlug(data.slug)) {
    throw new AppError("A category with this slug already exists", 409);
  }

  let category;
  try {
    category = await categoryRepository.create(data);
  } catch (err) {
    // race condition caught by the unique index
    if (err.code === 11000) {
      throw new AppError("A category with this slug already exists", 409);
    }
    throw err;
  }

  // same shape as GET /api/categories (id + productCount)
  res.status(201).json({
    ...category.toObject(),
    id: category._id,
    productCount: 0,
  });
};