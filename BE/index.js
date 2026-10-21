
import "dotenv/config";
import os from "os";
import cors from "cors";
import express from "express";
import { bootstrap } from "./app.controller.js";

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:8080",
  "https://yarnoozah-sepia.vercel.app",
  "https://yarnoozah-gold.vercel.app",
  "https://yarnoozah-alpha.vercel.app",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.warn("CORS blocked origin:", origin);
      return callback(null, false);
    },
    methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    exposedHeaders: ["x-cart-id"],
  }),
);

app.use(express.json());

app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    console.log(
      `${req.method} ${req.originalUrl} -> ${res.statusCode} (${Date.now() - start}ms)`,
    );
  });

  next();
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

bootstrap(app, express);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Yarnoozah backend running on port ${PORT}`);
  console.log(`Local: http://localhost:${PORT}`);

  for (const list of Object.values(os.networkInterfaces())) {
    for (const net of list ?? []) {
      if (
        (net.family === "IPv4" || net.family === 4) &&
        !net.internal
      ) {
        console.log(`Network: http://${net.address}:${PORT}`);
      }
    }
  }
});
