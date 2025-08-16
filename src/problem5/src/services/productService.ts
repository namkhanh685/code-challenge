import { SUCCESS_CONSTANTS } from "@constants/successConstant";
import { productsTable } from "@database/schema";
import { CanNotAddProductError } from "@errors/canNotAddProductError";
import { BaseResponse } from "@interfaces/baseResponse";
import {
  addProductSchema,
  getProductByIdSchema,
  productQuerySchema,
  ProductResult,
  updateProductSchema,
} from "@schemas/productSchema";
import databaseClient from "database/databaseClient";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { and, eq, gt, gte, lte, asc, desc } from "drizzle-orm";
import { ProductNotFoundError } from "@errors/productNotFoundError";

export async function addProduct(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const addProductData = addProductSchema.parse(req.body);

  try {
    const result = await databaseClient
      .insert(productsTable)
      .values({
        ...addProductData,
      })
      .returning();

    if (!result[0]) {
      throw new CanNotAddProductError();
    }

    const response: BaseResponse<ProductResult> = {
      statusCode: SUCCESS_CONSTANTS.PRODUCT_ADDED.CODE,
      message: SUCCESS_CONSTANTS.PRODUCT_ADDED.MESSAGE,
      data: {
        ...result[0],
        price: Number(result[0].price),
      },
    };

    res.status(StatusCodes.CREATED).json(response);
  } catch (error) {
    next(error);
  }
}

export async function getProductById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  // Parse the product ID from the request parameters
  const productId = getProductByIdSchema.parse(req.params).id;

  try {
    const result = await databaseClient
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, productId))
      .execute();

    if (result.length === 0 || !result[0]) {
      throw new ProductNotFoundError();
    }

    const response: BaseResponse<ProductResult> = {
      statusCode: SUCCESS_CONSTANTS.PRODUCT_RETRIEVED.CODE,
      message: SUCCESS_CONSTANTS.PRODUCT_RETRIEVED.MESSAGE,
      data: {
        ...result[0],
        price: Number(result[0].price),
      },
    };

    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    next(error);
  }
}

export async function updateProductById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  // Parse data from request
  const productId = getProductByIdSchema.parse(req.params).id;
  const updateProductData = updateProductSchema.parse(req.body);

  try {
    const result = await databaseClient
      .update(productsTable)
      .set({
        ...updateProductData,
      })
      .where(eq(productsTable.id, productId))
      .returning();

    if (result.length === 0 || !result[0]) {
      throw new ProductNotFoundError();
    }

    const response: BaseResponse<ProductResult> = {
      statusCode: SUCCESS_CONSTANTS.PRODUCT_UPDATED.CODE,
      message: SUCCESS_CONSTANTS.PRODUCT_UPDATED.MESSAGE,
      data: {
        ...result[0],
        price: Number(result[0].price),
      },
    };

    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    next(error);
  }
}

export async function deleteProductById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  // Parse the product ID from the request parameters
  const productId = getProductByIdSchema.parse(req.params).id;

  try {
    const result = await databaseClient
      .delete(productsTable)
      .where(eq(productsTable.id, productId))
      .returning();

    if (result.length === 0 || !result[0]) {
      throw new ProductNotFoundError();
    }

    const response: BaseResponse<null> = {
      statusCode: SUCCESS_CONSTANTS.PRODUCT_DELETED.CODE,
      message: SUCCESS_CONSTANTS.PRODUCT_DELETED.MESSAGE,
      data: null,
    };

    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    next(error);
  }
}

export async function GetProductsWithPagination(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  // Parse the query parameters to object
  const queryParams = productQuerySchema.parse(req.query);

  // Build where conditions
  const conditions = [];

  // Price filters
  if (queryParams.minPrice) {
    conditions.push(gte(productsTable.price, queryParams.minPrice));
  }
  if (queryParams.maxPrice) {
    conditions.push(lte(productsTable.price, queryParams.maxPrice));
  }

  // Stock filters
  if (queryParams.minStock) {
    conditions.push(gte(productsTable.stock, queryParams.minStock));
  }
  if (queryParams.maxStock) {
    conditions.push(lte(productsTable.stock, queryParams.maxStock));
  }
  if (queryParams.inStock === true) {
    conditions.push(gt(productsTable.stock, 0));
  } else if (queryParams.inStock === false) {
    conditions.push(eq(productsTable.stock, 0));
  }

  try {
    const offset = (queryParams.page - 1) * queryParams.pageSize;
    const result = await databaseClient
      .select()
      .from(productsTable)
      .where(and(...conditions))
      .orderBy(
        queryParams.sortOrder === "desc"
          ? desc(productsTable[queryParams.sortBy])
          : asc(productsTable[queryParams.sortBy])
      )
      .limit(queryParams.pageSize)
      .offset(offset)
      .execute();

    const response: BaseResponse<ProductResult[]> = {
      statusCode: SUCCESS_CONSTANTS.LIST_PRODUCTS_RETRIEVED.CODE,
      message: SUCCESS_CONSTANTS.LIST_PRODUCTS_RETRIEVED.MESSAGE,
      data: result.map((product) => ({
        ...product,
        price: Number(product.price),
      })),
    };

    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    next(error);
  }
}
