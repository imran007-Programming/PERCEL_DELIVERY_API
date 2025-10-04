import { Response } from "express";
import { envVars } from "../config/env";

export interface AuthToken {
  accessToken?: string;
  refreshToken?: string;
}

export const setAuthCookies = (res: Response, tokenInfo: AuthToken) => {
  const cookieOptions = {
    httpOnly: true,
    secure: true, // Railway uses HTTPS ✅
    sameSite: "none" as const,
    path: "/", // apply cookie to all routes
  };

  if (tokenInfo.accessToken) {
    res.cookie("accessToken", tokenInfo.accessToken, cookieOptions);
  }

  if (tokenInfo.refreshToken) {
    res.cookie("refreshToken", tokenInfo.refreshToken, cookieOptions);
  }
};
