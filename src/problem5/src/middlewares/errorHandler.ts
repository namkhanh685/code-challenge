import { BaseError } from '@interfaces/baseError';
import { BaseResponse } from '@interfaces/baseResponse';
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: BaseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  const errorResponse: BaseResponse<null> = {
    message: err.message,
    statusCode: err.statusCode
  };
  
  res.status(err.httpStatus || 500).json(errorResponse);
};