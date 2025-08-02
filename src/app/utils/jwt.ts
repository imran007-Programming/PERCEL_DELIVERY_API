import { JwtPayload, SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";
export const genarateToken = (
  payload: JwtPayload,
  secret: string,
  expiredIn: string
) => {
  const token = jwt.sign(payload, secret, {
    expiresIn: expiredIn,
  } as SignOptions);

  return token;
};

/* verify the token */

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};
