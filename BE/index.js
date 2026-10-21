import "dotenv/config";
import os from "os";
import cors from "cors";
import express from "express";
import { bootstrap } from "./app.controller.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Allowed frontends: local dev, your Vercel production domain, and any
// Vercel preview URL for your project (they change on every deployment).
const allowedOrigins = [
  "http://localhost:8080",
  "https://yarnoozah-9t62.vercel.app",
  process.env.CLIENT_URL, // optional: extra origin set from Back4app env vars
].filter(Boolean);

const vercelPreview = /^https:\/\/yarnoozah-9t62-[a-z0-9-]+\.vercel\.app$/;

app.use(
  cors({
    origin(origin, callback) {
      // No Origin header = curl, server-to-server, health checks: allow.
      if (!origin) return callback(null, true);

      const isLan = /^http:\/\/(192\.168|10\.|172\.(1[6-9]|2\d|3[01]))\./.test(origin);

      if (allowedOrigins.includes(origin) || vercelPreview.test(origin) || isLan) {
        return callback(null, true);
      }
      return callback(null, false); // browser will block it, server doesn't crash
    },
  })
);

// Tiny request logger: shows method, URL (with query string), status, and time.
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode} (${Date.now() - start}ms)`);
  });
  next();
});

// Quick check that the server is reachable: open /api/health in the browser.
app.get("/api/health", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Mounts body parsers, routers (/api/products, /api/categories, ...) and the error handler.
bootstrap(app, express);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`yarnoozah backend running on port ${PORT}`);
  console.log(`  Local:   http://localhost:${PORT}`);

  for (const list of Object.values(os.networkInterfaces())) {
    for (const net of list ?? []) {
      if ((net.family === "IPv4" || net.family === 4) && !net.internal) {
        console.log(`  Network: http://${net.address}:${PORT}`);
      }
    }
  }
});