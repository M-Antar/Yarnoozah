import cors from "cors";
import { connectDB } from "./src/db/index.js";

import { categoryRouter } from "./src/modules/category/category.route.js";
import { productRouter } from "./src/modules/product/product.route.js";
import { cartRouter } from "./src/modules/cart/cart.route.js";
import { orderRouter } from "./src/modules/order/order.route.js";
import { newsletterRouter } from "./src/modules/newsletter/newsletter.route.js";
import { errorHandler, notFoundHandler } from "./src/err/index.js";

export function bootstrap(app, express) {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      exposedHeaders: ["x-cart-id"],
    })
  );
  app.use(express.json());

  app.use("/api/categories", categoryRouter);
  app.use("/api/products", productRouter);
  app.use("/api/cart", cartRouter);
  app.use("/api/orders", orderRouter);
  app.use("/api/newsletter", newsletterRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  connectDB();
}