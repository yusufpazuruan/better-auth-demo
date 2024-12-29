import dotenv from "dotenv";
import { defineConfig, type Config } from "drizzle-kit";

dotenv.config({
  path: ".env",
});

const dbUrl = process.env.POSTGRES_URL;

if (!dbUrl) {
  throw new Error("POSTGRES_URL environment variable is not set");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/lib/db/schema.ts",
  out: "./src/lib/db/migrations",
  dbCredentials: {
    url: dbUrl,
  },
  strict: true,
}) satisfies Config;
