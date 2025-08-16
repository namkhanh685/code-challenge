import { ERROR_CONSTANTS } from "@constants/errorConstant";
import { BaseError } from "@interfaces/baseError";

export class CanNotAddProductError implements BaseError {
  public name = "CanNotAddProductError";
  public httpStatus: number;
  public statusCode: number;
  public message: string;

  constructor() {
    this.httpStatus = 500;
    this.statusCode = ERROR_CONSTANTS.CAN_NOT_ADD_PRODUCT.CODE;
    this.message = ERROR_CONSTANTS.CAN_NOT_ADD_PRODUCT.MESSAGE;
  }
}
