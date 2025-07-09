import { schema } from "./schema/index.ts";
import postgres from "postgres";
import { environment } from "../environments.ts";
import { drizzle } from "drizzle-orm/postgres-js";

export const sql = postgres(environment.DATABASE_URL);

export const db = drizzle(sql, {
  schema,
  casing: "snake_case",
});
