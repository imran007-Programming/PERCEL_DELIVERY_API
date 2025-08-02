/* eslint-disable @typescript-eslint/no-explicit-any */
import { TError, TGenericErrorResponse } from "../interfaces/error.type";

export const handleValidationError = (err: any):TGenericErrorResponse => {
  const errorSources: TError[] = [];

  const errors = Object.values(err.errors);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors.forEach((errorObject: any) =>
    errorSources.push({
      path: errorObject.path,
      message: errorObject.message,
    })
  );
  return {
    statusCode: 400,
    message: "validation error",
    errorSources,
  };
};