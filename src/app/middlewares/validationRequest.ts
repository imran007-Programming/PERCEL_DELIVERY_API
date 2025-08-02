import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";


export const zodValidation=(customZodScema:ZodObject)=>async(req:Request,res:Response,next:NextFunction)=>{
    try {
        req.body=await customZodScema.parseAsync(req.body)
        next()
    } catch (error) {
        next(error)
    }
}