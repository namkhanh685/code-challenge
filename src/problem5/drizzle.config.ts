import config from "@config/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/database/schema.ts",
  out: "./src/database/migrations",
  dbCredentials: {
    url: config.databaseUrl,
  },
  dialect: "postgresql",
  verbose: true,
  strict: true,
});