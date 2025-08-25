import { JwtPayload } from 'jsonwebtoken';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { authServices } from "./auth.service";
import { setAuthCookies } from "../../utils/setCookies";
import AppError from "../../errorHelper/AppError";

const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await authServices.loginUserService(res,req.body);

 
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User loged in successfully",

      data: user,
    });
  }
);

/* create a new accesstoken from refereshtoken  */

const getNewAccessToken=catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken= req.cookies.refreshToken;
  
  if(!refreshToken){
    throw new AppError(httpStatus.BAD_REQUEST, "No Refresh Token");
  }
  const tokenInfo= await authServices.getNewAccessTokenService(refreshToken as string)
 

  setAuthCookies(res,tokenInfo)
       
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Token Retrived successfully",

      data: tokenInfo,
    });
  }
);

/* logout controller */

const logout=catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("accessToken",{
      httpOnly:true,
      secure:false,
      sameSite:"lax",
    })
     res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
       
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User logout successfully",

      data: null,
    });
  }
);

/* Reset Password Controller */
const resetPassword = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user;
    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;
    
    
     
    await authServices.resetPassword(oldPassword, newPassword, decodedToken as JwtPayload);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Passworrd Changed Successfully",
      data: null,
    });
  }
);


export const authController = {
  loginUser,
  getNewAccessToken,
  logout,
  resetPassword
};
