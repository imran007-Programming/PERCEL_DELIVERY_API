/* eslint-disable @typescript-eslint/no-explicit-any */
import { TGenericErrorResponse } from "../interfaces/error.type";

export const duplicateErrorHandler = (err: any): TGenericErrorResponse => {
  const field = Object.keys(err.keyPattern)[0];
  const value = err.keyValue[field];

  return {
    statusCode: 400,
    message: `${field} ${value} already exist`,
  };
};
