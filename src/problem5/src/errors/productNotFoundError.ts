import { ERROR_CONSTANTS } from "@constants/errorConstant";
import { BaseError } from "@interfaces/baseError";

export class ProductNotFoundError implements BaseError {
  public name = "ProductNotFoundError";
  public httpStatus: number;
  public statusCode: number;
  public message: string;

  constructor() {
    this.httpStatus = 500;
    this.statusCode = ERROR_CONSTANTS.PRODUCT_NOT_FOUND.CODE;
    this.message = ERROR_CONSTANTS.PRODUCT_NOT_FOUND.MESSAGE;
  }
}
