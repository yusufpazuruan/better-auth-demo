import { drizzle } from "drizzle-orm/postgres-js";
import dotenv from "dotenv";
import postgres from "postgres";

import * as schema from "@/lib/db/schema";

dotenv.config({
  path: ".env",
});

const dbUrl = process.env.POSTGRES_URL;

if (!dbUrl) {
  throw new Error("POSTGRES_URL environment variable is not set");
}

const client = postgres(dbUrl);

export const db = drizzle(client, { schema });
