/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { TError } from "../interfaces/error.type";
import { envVars } from "../config/env";
import { duplicateErrorHandler } from "../Helpers/duplicateError";
import AppError from "../errorHelper/AppError";
import { handleValidationError } from "../Helpers/handleValidationError";
import { handleZodError } from "../Helpers/handleZodEreror";
import { handleCastError } from "../Helpers/handleCastError";
import { ZodError } from "zod";

export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errorsAray: TError[] = [];
  let statusCode = 500;
  let message = `something went wrong ${error.message}`;

  if (envVars.NODE_ENV === "development") {
    console.log(error);
  }
  /* duplicate error */

  if (error.code === 11000) {
    const simplyfiedError = duplicateErrorHandler(error);
    statusCode = simplyfiedError.statusCode;
    message = simplyfiedError.message;
  }
  //  /* zod Error */
  else if (error.name === "ZodError") {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorsAray = simplifiedError.errorSources as TError[];
  }

  ///object id error
  else if (error.name === "CastError") {
    const simplyFiedError = handleCastError(error);
    statusCode = simplyFiedError.statusCode;
  }

  // mongoose validation error
  else if (error.name === "ValidationError") {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    errorsAray = simplifiedError.errorSources as TError[];
    message = simplifiedError.message;
  } else if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  } else if (error instanceof Error) {
    statusCode = 500;
    message = error.message;
  }
  res.status(statusCode).json({
    success: false,
    message,
    error: envVars.NODE_ENV === "development" ? error : null,
    errorsAray,
    stack: envVars.NODE_ENV === "development" ? error.stack : null,
  });
};
