import {
  validateBodyData,
  validateParams,
} from "@middlewares/validationMiddleware";
import {
  addProductSchema,
  getProductByIdSchema,
  productQuerySchema,
  updateProductSchema,
} from "@schemas/productSchema";
import {
  addProduct,
  deleteProductById,
  getProductById,
  GetProductsWithPagination,
  updateProductById,
} from "@services/productService";
import express, { Router } from "express";

const productController: Router = express.Router();

productController.get(
  "/search",
  validateParams(productQuerySchema),
  GetProductsWithPagination
);
productController.get(
  "/:id",
  validateParams(getProductByIdSchema),
  getProductById
);
productController.post("/", validateBodyData(addProductSchema), addProduct);
productController.put(
  "/:id",
  validateParams(getProductByIdSchema),
  validateBodyData(updateProductSchema),
  updateProductById
);
productController.delete(
  "/:id",
  validateParams(getProductByIdSchema),
  deleteProductById
);

export default productController;
