import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { StatusCodes } from "http-status-codes";
import { ERROR_CONSTANTS } from "@constants/errorConstant";
import { BaseResponse } from "@interfaces/baseResponse";

export function validateBodyData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      let response: BaseResponse<null> = {
        message: ERROR_CONSTANTS.INTERNAL_SERVER_ERROR.MESSAGE,
        statusCode: ERROR_CONSTANTS.INTERNAL_SERVER_ERROR.CODE,
      };

      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((issue) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));

        response = {
          message: errorMessages.map((e) => e.message).join(", "),
          statusCode: StatusCodes.BAD_REQUEST,
        };
        res.status(StatusCodes.BAD_REQUEST).json(response);
      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
      }
    }
  };
}

export function validateParams(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.params);
      next();
    } catch (error) {
      let response: BaseResponse<null> = {
        message: ERROR_CONSTANTS.INTERNAL_SERVER_ERROR.MESSAGE,
        statusCode: ERROR_CONSTANTS.INTERNAL_SERVER_ERROR.CODE,
      };

      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((issue) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));

        response = {
          message: errorMessages.map((e) => e.message).join(", "),
          statusCode: StatusCodes.BAD_REQUEST,
        };
        res.status(StatusCodes.BAD_REQUEST).json(response);
      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
      }
    }
  };
}
