import "dotenv/config";
import os from "os";
import cors from "cors";
import express from "express";
import { bootstrap } from "./app.controller.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Allow any origin in development (works from localhost, LAN IPs, and phones).
// For production, replace `true` with: process.env.CLIENT_URL
app.use(cors({ origin: true }));

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