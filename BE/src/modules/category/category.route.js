import { Router } from "express";
import { asyncErrorHandler } from "../../err/index.js";
import { isvalid } from "../../middlewear/validation.middlewear.js";
import { getCategorySchema } from "./category.validation.js";
import { getAllCategories, getCategoryBySlug } from "./category.service.js";
import { createCategorySchema } from "./category.validation.js";
import { createCategory } from "./category.service.js";


export const categoryRouter = new Router();

categoryRouter.get("/", asyncErrorHandler(getAllCategories));
categoryRouter.get("/:slug", isvalid(getCategorySchema), asyncErrorHandler(getCategoryBySlug));

categoryRouter.post(
  "/",
  isvalid(createCategorySchema),
  asyncErrorHandler(createCategory)
);