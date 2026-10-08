import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  GEMINI_API_KEY: z.string(),
  ALLOWED_ORIGINS: z.string().transform((value) => value.split(",")),
});

export const env = envSchema.parse(process.env);
