import { defineConfig } from "drizzle-kit";
import { environment } from "./src/environments.ts";

export default defineConfig({
  dialect: "postgresql",
  casing: "snake_case",
  schema: "./src/db/schema",
  out: "./src/db/migrations",
  dbCredentials: {
    url: environment.DATABASE_URL,
  },
});
