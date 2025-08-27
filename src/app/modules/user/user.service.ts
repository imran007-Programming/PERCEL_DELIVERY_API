import bcryptjs from "bcrypt";
import httpStatus from "http-status-codes";
import AppError from "../../errorHelper/AppError";
import { IAuthProvider, ISActive, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { userSearchableFields } from "./user.constant";

const createUserService = async (payload: Partial<IUser>) => {
  const { email, password, name, address, phone, ...rest } = payload;
  

  const existUser = await User.findOne({ email });

  if (existUser) {
    if (!existUser.password) {
      if (password) existUser.password = password;
      if (name) {
        existUser.name = payload.name || existUser.name;
      }
      if (address) {
        existUser.address = payload.address || existUser.address;
      }
      if (phone) {
        existUser.phone = payload.phone || existUser.phone;
      }

      await existUser.save();
      return existUser;
    } else {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "user already Exist please log in"
      );
    }
  }

  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string,
  };
  const user = await User.create({
    email,
    password,
    name,
    address,
    phone,
    auths: [authProvider],
    ...rest,
  });
  return user;
};

/* GEt Me Service */
const GetMeService = async (userId:string) => {
  const user = await User.findById(userId).select("-password");
  return {
    data:user,
  };
};

/* get all user service */
const getAllUserService = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(User.find(), query);

  const user = queryBuilder
    .filter()
    .search(userSearchableFields)
    .sort()
    .fields()
    .paginate();
  const [userData, meta] = await Promise.all([
    user.build(),
    queryBuilder.getMeta(),
  ]);
  return {
    userData,
    meta,
  };
};
/* delete user service */

const deleteUserService = async (userID: string) => {
  return await User.findByIdAndDelete(userID);
};

/* update a user service */

const updateUserService = async (
  userId: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload
) => {
  const existUser = await User.findById(userId);
  if (!existUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User dosen't exist");
  }

  /* check role */
  if (payload.role) {
    if (
      decodedToken.role === Role.RECEIVER ||
      decodedToken.role === Role.SENDER
    ) {
      throw new AppError(httpStatus.FORBIDDEN, "you are not authorized");
    }
  }
  if (payload.isActive || payload.isVerified || payload.isDeleted) {
    if (
      decodedToken.role === Role.SENDER ||
      decodedToken.role === Role.RECEIVER
    ) {
      throw new AppError(httpStatus.FORBIDDEN, "you are not authorized");
    }
  }
  /* password rehasing */

  if (payload.password) {
    const hashPassword = await bcryptjs.hash(
      payload.password,
      envVars.SALT_ROUND
    );
    payload.password = hashPassword;
  }

  const newUpdateUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });
  return newUpdateUser;
};

/* block a user */

const blockUserService = async (userId: string) => {
  const existUser = await User.findById(userId);
  if (!existUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User dosen't exist");
  }
  if (existUser.isActive === ISActive.BLOCKED) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already blocked");
  }

  existUser.isActive = ISActive.BLOCKED;
  return await existUser.save();
};
/* unblock a user */

const unblockUserService = async (userId: string) => {
  const existUser = await User.findById(userId);
  if (!existUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User dosen't exist");
  }

  existUser.isActive = ISActive.ACTIVE;
  return await existUser.save();
};

export const userServices = {
  createUserService,
  GetMeService,
  getAllUserService,
  deleteUserService,
  updateUserService,
  blockUserService,
  unblockUserService,

};
