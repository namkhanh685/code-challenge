import { z } from "zod";

export const addProductSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  price: z.number().nonnegative(),
  stock: z.number().int().nonnegative(),
  brand: z.string(),
});

export const updateProductSchema = addProductSchema;

export const getProductByIdSchema = z.object({
  id: z.uuid(),
});

export const productQuerySchema = z.object({
  minPrice: z
    .string()
    .transform((val) => parseFloat(val))
    .pipe(z.number().nonnegative())
    .optional(),
  maxPrice: z
    .string()
    .transform((val) => parseFloat(val))
    .pipe(z.number().nonnegative())
    .optional(),
  minStock: z
    .string()
    .transform((val) => parseInt(val))
    .pipe(z.number().int().nonnegative())
    .optional(),
  maxStock: z
    .string()
    .transform((val) => parseInt(val))
    .pipe(z.number().int().nonnegative())
    .optional(),
  inStock: z
    .string()
    .transform((val) => val === "true")
    .pipe(z.boolean())
    .optional(),
  page: z
    .string()
    .transform((val) => parseInt(val))
    .pipe(z.number().int().positive())
    .default(1),
  pageSize: z
    .string()
    .transform((val) => parseInt(val))
    .pipe(z.number().int().positive().max(100))
    .default(10),
  sortBy: z.enum(["name", "price", "stock", "brand"]).default("name"),
  sortOrder: z.enum(["asc", "desc"]).default("asc"),
});

export const productResultSchema = addProductSchema.extend({
  id: z.string(),
});
export type ProductResult = z.infer<typeof productResultSchema>;
