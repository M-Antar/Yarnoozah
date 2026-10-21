import crypto from "crypto";
import { productRepository } from "../../models/product/product.repository.js";
import { Category } from "../../models/category/category.model.js";
import { AppError } from "../../err/index.js";

const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const getAllProducts = async (req, res, next) => {
  const result = await productRepository.findWithFilters(req.query);
  res.status(200).json(result);
};

export const getFeaturedProducts = async (req, res, next) => {
  const limit = req.query.limit ? Number(req.query.limit) : undefined;
  const products = await productRepository.findFeatured(limit);
  res.status(200).json(products);
};

export const getProductByIdOrSlug = async (req, res, next) => {
  const product = await productRepository.findByIdOrSlug(req.params.id);
  if (!product) {
    throw new AppError("Product not found", 404);
  }
  res.status(200).json(product);
};

export const getRelatedProducts = async (req, res, next) => {
  const product = await productRepository.findByIdOrSlug(req.params.id);
  if (!product) {
    throw new AppError("Product not found", 404);
  }
  const limit = req.query.limit ? Number(req.query.limit) : undefined;
  const related = await productRepository.findRelated(product, limit);
  res.status(200).json(related);
};

export const createProduct = async (req, res, next) => {
  const data = { ...req.body };

  // category must exist
  const categoryExists = await Category.exists({ _id: data.category });
  if (!categoryExists) {
    throw new AppError("Category not found", 404);
  }

  // slug: provided or derived from title
  data.slug = data.slug || slugify(data.title);
  const slugTaken = await productRepository.getOne({ slug: data.slug }, "_id");
  if (slugTaken) {
    throw new AppError("A product with this slug already exists", 409);
  }

  // server-generated color ids
  data.colors = (data.colors || []).map((c) => ({
    ...c,
    id: crypto.randomUUID(),
  }));

  let product;
  try {
    product = await productRepository.create(data);
  } catch (err) {
    // two requests raced past the slug check; the unique index catches it
    if (err.code === 11000) {
      throw new AppError("A product with this slug already exists", 409);
    }
    throw err;
  }

  // match the shape returned by the GET endpoints (populated category)
  await product.populate("category");

  res.status(201).json(product);
};