/* eslint-disable @typescript-eslint/no-explicit-any */
import { TError, TGenericErrorResponse } from "../interfaces/error.type";

export const handleZodError=(err:any):TGenericErrorResponse=>{
  const errorSources: TError[] = [];
    
  err.issues.forEach((issue:any)=>{
   errorSources.push({
    path:issue.path[issue.path.length -1],
    message:issue.message
   })
  })
 return {
    statusCode: 400,
    message: "zod error",
    errorSources
  };
}