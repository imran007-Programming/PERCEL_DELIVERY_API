/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";

import { userServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userServices.createUserService(req.body);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User Created Successfully",
      data: user,
    });
  }
);
/* Get Me controller */

const getMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const DecodedToken = req.user as JwtPayload;
    const result = await userServices.GetMeService(DecodedToken.userId);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User Profile Retrive Successfully",
      data: result.data,
    });
  }
);

/* get all user controller */
const getAllusers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query as Record<string, string>;
    const userData = await userServices.getAllUserService(query);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User retrived Successfully",
      data: userData,
    
    });
  }
);
/* delete user controller */
const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    const user = await userServices.deleteUserService(userId);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User deleted Successfully",
      data: user,
    });
  }
);
/* update a usrer */
const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    const payload = req.body;
    const verifiedToken = req.user;
    const user = await userServices.updateUserService(
      userId,
      payload,
      verifiedToken as JwtPayload
    );
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User Updated Successfully",
      data: user,
    });
  }
);

/* block a user */
const blockUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    const blockUser = await userServices.blockUserService(userId);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User Blocked Successfully",
      data: blockUser,
    });
  }
);
/* unblock a user */
const unblockUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    const unblockUser = await userServices.unblockUserService(userId);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User Unblocked Successfully",
      data: unblockUser,
    });
  }
);

export const userControllers = {
  createUser,
  getAllusers,
  deleteUser,
  updateUser,
  blockUser,
  unblockUser,
  getMe,
};
