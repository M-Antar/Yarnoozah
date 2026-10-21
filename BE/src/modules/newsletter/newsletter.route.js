import { Router } from "express";
import { asyncErrorHandler } from "../../err/index.js";
import { isvalid } from "../../middlewear/validation.middlewear.js";
import { subscribeSchema } from "./newsletter.validation.js";
import { subscribeToNewsletter } from "./newsletter.service.js";

export const newsletterRouter = new Router();

newsletterRouter.post("/subscribe", isvalid(subscribeSchema), asyncErrorHandler(subscribeToNewsletter));