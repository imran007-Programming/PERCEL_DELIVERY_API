
import  httpStatus  from 'http-status-codes';
import jwt, { JwtPayload }  from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelper/AppError";
import { envVars } from '../config/env';
import { User } from '../modules/user/user.model';
import { ISActive } from '../modules/user/user.interface';



export const checkAuth=(...authRoles:string[])=>async(req:Request,res:Response,next:NextFunction)=>{
  
    try {
        const accessToken=req.headers.authorization;
        if(!accessToken){
            throw new AppError(403,"token not provided")
        }

        const verifyToken=jwt.verify(accessToken,envVars.JWT_SECRET) as JwtPayload;
           
        const existUser= await User.findOne({email:verifyToken.email})

        if(!existUser){
            throw new AppError(httpStatus.NOT_FOUND,"user not found")
        }
        if(existUser.isActive===ISActive.BLOCKED){
            throw new AppError(httpStatus.BAD_REQUEST,`User is ${existUser.isActive}`)
        }
        if(existUser.isDeleted){
            throw new AppError(httpStatus.BAD_REQUEST,`User is Deleted`)
        }
         
        if(!authRoles.includes(verifyToken.role)){
            throw new AppError(403,"you have no permission to access this route")
        }
       req.user=verifyToken
        next()

    } catch (error) {
        next(error)
    }

}