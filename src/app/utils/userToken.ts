import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import { ISActive, IUser } from "../modules/user/user.interface";
import { genarateToken, verifyToken } from "./jwt";
import { User } from "../modules/user/user.model";
import AppError from "../errorHelper/AppError";


export const createUserToken = (user: Partial<IUser>) => {
  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };
  /* createAccessToken */
  const accessToken = genarateToken(
    jwtPayload,
    envVars.JWT_SECRET,
    envVars.JWT_EXPIRES_IN
  );

  /* createRefreshToken */
  const refreshToken = genarateToken(
    jwtPayload,
    envVars.JWT_REFRESH_SECRET,
    envVars.JWT_REFRESH_SECRET_EXPIRES
  );

  return {
    accessToken,
    refreshToken,
  };
};

/* create new accessToken with refreshToken */
export const createNewAccessTokenWithRefreshToken = async (
  refreshToken: string
) => {
  const verifyRefreshToken = verifyToken(
    refreshToken,
    envVars.JWT_REFRESH_SECRET
  ) as JwtPayload;
  const ExistUser = await User.findOne({ email: verifyRefreshToken.email });
  if (!ExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, "Email doesn't exist");
  }
  if (ExistUser.isActive === ISActive.BLOCKED) {
    throw new AppError(httpStatus.BAD_REQUEST, `User is ${ExistUser.isActive}`);
  }
  if (ExistUser.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is deleted");
  }

  const JwtPayload = {
    userId: ExistUser._id,
    email: ExistUser.email,
    role: ExistUser.role,
  };

  const accessToken = genarateToken(
    JwtPayload,
    envVars.JWT_SECRET,
    envVars.JWT_EXPIRES_IN
  );

  return accessToken

};
