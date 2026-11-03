import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import contactRoutes from "./routes/contact.routes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim());

app.set("trust proxy", 1); // so rate limiting sees real client IPs behind Render/Railway
app.use(helmet());
app.use(cors({ origin: allowedOrigins, methods: ["GET", "POST"] }));
app.use(express.json({ limit: "10kb" }));

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/contact", contactRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`API listening on port ${PORT}`));