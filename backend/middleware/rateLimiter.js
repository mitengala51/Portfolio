import { rateLimit } from "express-rate-limit";

export const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Too many messages. Please try again later." },
});