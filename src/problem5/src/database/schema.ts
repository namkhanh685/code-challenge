import { integer, numeric, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const productsTable = pgTable("products", {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 1000 }),
  price: numeric<"number">().notNull(),
  stock: integer().notNull().default(0),
  brand: varchar({ length: 255 }).notNull(),
});
