import { JwtPayload } from 'jsonwebtoken';
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";
import { percelServices } from "./percel.service";
/* create percel controller */
const createPercel = catchAsync(async (req: Request, res: Response) => {
  const percel = await percelServices.createPercelSevice(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "percel created Succesfully",
    data: percel,
  });
});

/* get Allpercel controller */
const getAllPercel = catchAsync(async (req: Request, res: Response) => {
  const query=req.query as  Record<string,string>
  const percelData = await percelServices.getAllPercelService(query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "percel Retrived Succesfully",
    data: percelData,
   
  });
});

/* get Allpercel controller */
const getPercelById = catchAsync(async (req: Request, res: Response) => {
  const percelId= req.params.percelId


  const percel = await percelServices.getPercelByIdService(percelId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "percel Retrived Succesfully",
    data: percel
    
  });
});

/* delete percel controller */
const deletePercel = catchAsync(async (req: Request, res: Response) => {
  const percelId = req.params.percelId;
  const percel = await percelServices.deletePercelService(percelId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "percel deleted Succesfully",
    data: percel,
  });
});

/* delete percel controller */
const updatePercel = catchAsync(async (req: Request, res: Response) => {
  const percelId = req.params.percelId;
  const payload=req.body;
  const decodedToken=req.user as JwtPayload
  
  const percel = await percelServices.updatePercelService(percelId,payload,decodedToken);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Parcel updated successfully",
    data: percel,
  });
});

/* get percel details by senderinfo */
const getPercelInfo=catchAsync(async (req: Request, res: Response) => {
  const senderId = req.params.senderId;
 
  const percel = await percelServices.getPercelInfoBySenderService(senderId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "percel retrived Succesfully",
    data: percel,
  });
});


/* get percel details by senderinfo */
const trackingPercel=catchAsync(async (req: Request, res: Response) => {
  const trackingId = req.params.trackingId;
  const percel = await percelServices.getPercelInByTrackinIdService(trackingId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "percel retrived Succesfully",
    data: percel,
  });
});

/* return  percel */
const retrunPercel=catchAsync(async (req: Request, res: Response) => {

  

  const percel = await percelServices.returnPercelTrackinIdService(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "percel Returned Succesfully",
    data: percel,
  });
});

export const percelController = {
  createPercel,
  deletePercel,
  getAllPercel,
  getPercelById,
  updatePercel,
  getPercelInfo,
  trackingPercel,
  retrunPercel
};
