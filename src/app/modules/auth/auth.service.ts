/* eslint-disable @typescript-eslint/no-unused-vars */
import bcryptjs from "bcrypt";
import httpStatus from "http-status-codes";
import AppError from "../../../app/errorHelper/AppError";
import { ISActive, IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import {
  createNewAccessTokenWithRefreshToken,
  createUserToken,
} from "../../utils/userToken";
import { setAuthCookies } from "../../utils/setCookies";
import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";

const loginUserService = async (res:Response,payload: Partial<IUser>) => {
  const { email, password } = payload;
  const ExistUser = await User.findOne({ email });
  if (!ExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, "Email doesn't found");
  }
   if (!ExistUser.password) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "Account was auto-created. Please complete registration first."
    );
  }
  if (ExistUser.isActive === ISActive.BLOCKED) {
    throw new AppError(httpStatus.FORBIDDEN, "user is blocked");
  }
  if (!password) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password not provided");
  }
  const isPasswordMatch = await bcryptjs.compare(password, ExistUser.password);
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid email and password");
  }
  const userToken = createUserToken(ExistUser);
   setAuthCookies(res, userToken);
  const { password: newpass, ...rest } = ExistUser.toObject();
  return {
    accessToken: userToken.accessToken,
    refreshToken: userToken.refreshToken,
    user: rest,
  };
};
/* get new accesstoken */
const getNewAccessTokenService = async (refreshToken: string) => {
  const newAccessToken = await createNewAccessTokenWithRefreshToken(
    refreshToken
  );



  

  return {
    accessToken: newAccessToken,
  };
};
  /* reset password */
  // * Reset password Business Logic */
const resetPassword = async (
  oldPassword: string,
  newPassword: string,
  decodedToken: JwtPayload
) => {
 
  const user = await User.findById(decodedToken.userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const isOldPasswordMatch = await bcryptjs.compare(
    oldPassword,
    user.password as string
  );
  if (!isOldPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Old password doesn't match");
  }
  user.password = newPassword;
  await user.save();
};

export const authServices = {
  loginUserService,
  getNewAccessTokenService,
  resetPassword
};
