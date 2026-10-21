import { Router } from "express";
import { asyncErrorHandler } from "../../err/index.js";
import { isvalid } from "../../middlewear/validation.middlewear.js";
import {
  listProductsSchema,
  getProductSchema,
  createProductSchema,
} from "./product.validation.js";
import {
  getAllProducts,
  getFeaturedProducts,
  getProductByIdOrSlug,
  getRelatedProducts,
  createProduct,
} from "./product.service.js";
// import { authenticate, authorize } from "../../middlewear/auth.middlewear.js";

export const productRouter = new Router();

// /featured MUST be before /:id
productRouter.get("/",  asyncErrorHandler(getAllProducts));
productRouter.get("/featured", asyncErrorHandler(getFeaturedProducts));
productRouter.get("/:id", asyncErrorHandler(getProductByIdOrSlug));
productRouter.get("/:id/related",  asyncErrorHandler(getRelatedProducts));

// Admin only: add your auth middleware before validation
productRouter.post(
  "/",
  // authenticate,
  // authorize("admin"),
  isvalid(createProductSchema),
  asyncErrorHandler(createProduct)
);