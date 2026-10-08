import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  GEMINI_API_KEY: z.string(),
  ALLOWED_ORIGINS: z.string().transform((value) =>
    value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  ),
});

export const env = envSchema.parse(process.env);
