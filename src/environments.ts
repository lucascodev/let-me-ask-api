import { z } from "zod";

export const environmentSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().url().startsWith("postgres://"),
  GOOGLE_GENAI_API_KEY: z.string(),
});

export const environment = environmentSchema.parse(process.env);
