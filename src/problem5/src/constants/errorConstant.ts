import { StatusCodes } from "http-status-codes";

// Error Constants
export const ERROR_CONSTANTS = {
  INTERNAL_SERVER_ERROR: {
    CODE: StatusCodes.INTERNAL_SERVER_ERROR,
    MESSAGE: "Internal Server Error",
  },
  CAN_NOT_ADD_PRODUCT: {
    CODE: 50001,
    MESSAGE: "Cannot add product",
  },

  PRODUCT_NOT_FOUND: {
    CODE: 40401,
    MESSAGE: "Product not found",
  },
};
