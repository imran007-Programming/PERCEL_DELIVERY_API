/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
import httpStatus from "http-status-codes";

import { User } from "../user/user.model";
import { DELIVERY_STATUS, IPercel } from "./percel.interface";
import { Percel } from "./percel.model";

import AppError from "../../errorHelper/AppError";
import { JwtPayload } from "jsonwebtoken";
import { Role } from "../user/user.interface";
import { sendEmail } from "../../utils/sendEmail";

import { percelSearchableFields } from "./percel.constant";
import { QueryBuilder } from "../../utils/QueryBuilder";

type createPercel = Partial<IPercel> & {
  recevierName: string;
  recevierEmail: string;
  recevierPhone: string;
  recevierAddress: string;
};

/* create A percel */
const createPercelSevice = async (payload: createPercel) => {
  let receiver = await User.findOne({ email: payload.recevierEmail });
  const sender = await User.findOne({ _id: payload.senderInfo });

  if (!receiver) {
    receiver = await User.create({
      name: payload.recevierName,
      email: payload.recevierEmail,
      phone: payload.recevierPhone,
      address: payload.recevierAddress,
      role: Role.RECEVIER,
    });
  }

  /* generate tracking ID */
  const generateTrackingId = (): string => {
    return `TRK${Date.now()}${Math.floor(Math.random() * 1000)}`;
  };

  const createPercel = await Percel.create({
    senderInfo: payload.senderInfo,
    reciverInfo: receiver._id,
    percelType: payload.percelType,
    weight: payload.weight,
    trackingId: generateTrackingId(),
    fee: payload.fee,
    receiverAddress: receiver.address,
    dispatchLocation: payload.dispatchLocation,
    pickupAddress: payload.pickupAddress,
    currentLocation: payload.currentLocation,
    deliveredAt: payload.deliveredAt,
    deliveryAgent: payload.deliveryAgent,
    estimate_delievery_date: payload.estimate_delievery_date,

    trackingEvents: [
      {
        status: DELIVERY_STATUS.PENDING,
        location: payload.currentLocation || "Not given",
        note: "percel created successfully",
        timestamp: new Date(),
      },
    ],
  });

  /* send reciever to trackingLing to check status */
  if (receiver?.email) {
    const subject = `Parcel Collected - Tracking ID: ${createPercel.trackingId}`;
    const message = `
Dear ${receiver.name || "Customer"},

We have collected your parcel (Tracking ID: ${createPercel.trackingId}) from ${
      sender?.shopName
    }.

You can track its status here:
👉 https://parcel-delevery-system-api.vercel.app/api/v1/percel/track/${
      createPercel.trackingId
    }

Thank you for choosing our service!

Best regards,  
Parcel Delivery Team
`;

    await sendEmail(receiver.email, subject, message);
  }

  return createPercel;
};

/* get all percel */
const getAllPercelService = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Percel.find(), query);

  const percel = queryBuilder
    .filter()
    .search(percelSearchableFields)
    .sort()
    .fields()
    .paginate();
  const [percelData, meta] = await Promise.all([
    percel.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    percelData,
    meta,
  };
};






/* get percel by senderInfo */
const getPercelInfoBySenderService = async (senderId: string, query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Percel.find({senderInfo: senderId}), query);


  
  // Apply filtering, searching, sorting, etc.
  const percels = queryBuilder
    .filter()  
    .search(percelSearchableFields)  

    .sort()    
    .fields()  
    .paginate();  

  const [percelData, meta] = await Promise.all([
    percels.build(),  // Build the aggregation query
    queryBuilder.getMeta(), // Get metadata for pagination
  ]);
 

  return {
    percelData,
    meta,
  };
};

/* get percel by receiverId */
const getPercelInfoByReceiverService = async (receiverId: string, query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Percel.find({reciverInfo: receiverId}), query);


  
  // Apply filtering, searching, sorting, etc.
  const percels = queryBuilder
    .filter()  
    .search(percelSearchableFields)  

    .sort()    
    .fields()  
    .paginate();  

  const [percelData, meta] = await Promise.all([
    percels.build(), 
    queryBuilder.getMeta(), 
  ]);
 

  return {
    percelData,
    meta,
  };
};


const confrimationByReceiverService = async (percelId:string) => {
  const findPercel = await Percel.findOne({ _id: percelId });

  if (!findPercel) {
    throw new AppError(httpStatus.NOT_FOUND, "percel not found");
  }

  
  // Update the isConfirm value to true
  findPercel.isConfirm = true;

 
  await findPercel.save();
};












/* get all percel */
const getPercelByIdService = async (percelId: string) => {
  const existPercel = await Percel.findById(percelId);
  if (!existPercel) {
    throw new AppError(httpStatus.NOT_FOUND, "percel not found");
  }

  return await Percel.findById(percelId)
    .populate("senderInfo", "name phone address email")
    .populate("reciverInfo", "name phone address email");
};


/* delete a percel */
const deletePercelService = async (percelId: string) => {
  const findPercel = await Percel.findById(percelId);
  if (!findPercel) {
    throw new AppError(httpStatus.NOT_FOUND, "Percel not dound");
  }

  return await Percel.findByIdAndDelete(percelId);
};
/* update a percel */
const updatePercelService = async (
  percelId: string,
  payload: Partial<IPercel>,
  decodedToken: JwtPayload
) => {
  console.log(payload)
  const findPercel = await Percel.findById(percelId);
  if (!findPercel) {
    throw new AppError(httpStatus.NOT_FOUND, "Parcel not found");
  }

  const role = decodedToken.role;

  let allowedUpdateFields: (keyof IPercel)[] = [];

  // Choose allowed fields by role
  if (role === Role.ADMIN) {
    allowedUpdateFields = [
      "percelType",
      "weight",
      "fee",
      "estimate_delievery_date",
      "deliveredAt",
      "isPaid",
      "currentLocation",
      "trackingEvents",
      "dispatchLocation",
      "pickupAddress",
      "deliveryAgent",
      "receiverAddress",
    ];
  } else if (role === Role.SENDER) {
    const lastStatus =
      findPercel.trackingEvents?.[findPercel.trackingEvents.length - 1]?.status;

    // Get the status being added by sender
    const newStatus =
      payload.trackingEvents && payload.trackingEvents.length > 0
        ? payload.trackingEvents[0]?.status
        : lastStatus;

    /* find out existing status to stop dulicate status update */
    const existingStatus = findPercel.trackingEvents.map(
      (value) => value.status
    );

    if (
      (newStatus === DELIVERY_STATUS.CANCELED &&
        [
          DELIVERY_STATUS.PICKED,
          DELIVERY_STATUS.IN_TRANSIT,
          DELIVERY_STATUS.DELIVERED,
        ].includes(lastStatus)) ||
      existingStatus.includes(newStatus)
    ) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `You cannot ${newStatus} the parcel because it is already ${lastStatus}`
      );
    }

    allowedUpdateFields = ["trackingEvents"];
  } else if (role === Role.DELIVERY_AGENT) {
    allowedUpdateFields = ["currentLocation", "deliveredAt", "trackingEvents"];
  } else {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You are not authorized to update"
    );
  }

  const invalidFields = Object.keys(payload).filter(
    (key) => !allowedUpdateFields.includes(key as keyof IPercel)
  );
  if (invalidFields.length > 0) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      `You are not authorized to change ${invalidFields.join(" and ")} value`
    );
  }

  /* handle tracking events */

  if (
    payload.trackingEvents &&
    allowedUpdateFields.includes("trackingEvents")
  ) {
    await Percel.findByIdAndUpdate(percelId, {
      $push: { trackingEvents: { $each: payload.trackingEvents } },
    });
  }

  //  Filter rest of the payload
  const filteredPayload = Object.fromEntries(
    Object.entries(payload).filter(
      ([key]) =>
        key !== "trackingEvents" &&
        allowedUpdateFields.includes(key as keyof IPercel)
    )
  );

  //  Update other allowed fields
  const updatedPercel = await Percel.findByIdAndUpdate(
    percelId,
    filteredPayload,
    {
      new: true,
      runValidators: true,
    }
  );

  return updatedPercel;
};

/* get percel by trackingId for user/receiver */

const getPercelInByTrackinIdService = async (trackingId: string) => {
  const percel = await Percel.findOne({ trackingId })
    .select("-_id trackingEvents senderInfo")
    .populate({
      path: "senderInfo",
      select: "name email phone address -_id",
    })
    .populate({
      path: "trackingEvents",
      select: "status note location timestamp",
    });
  if (!percel) {
    throw new AppError(403, "percel not found");
  }

  const result = {
    ...percel.toObject(),
    trackingEvents: percel.trackingEvents.map((event) => ({
      status: event.status,
      curreentLocation: event.location,
      arrivedAt: event.timestamp,
    })),
  };

  return result;
};

const returnPercelTrackinIdService = async (payload: createPercel) => {
  const percel = await Percel.findOne({ trackingId: payload.trackingId });
  const existUser = await User.findOne({ phone: payload.phone });
  const percelId = percel?._id;

  if (!percel) {
    throw new AppError(httpStatus.NOT_FOUND, "parcel not found");
  }
  if (!existUser) {
    throw new AppError(httpStatus.NOT_FOUND, "user not found");
  }
  if (existUser.role !== Role.RECEVIER) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "you are not able to return the percel"
    );
  }

  const lastStatus =
    percel.trackingEvents?.[percel.trackingEvents.length - 1]?.status;

  if (lastStatus !== DELIVERY_STATUS.DELIVERED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You can't return the percel until it's delevered"
    );
  }

  const result = await Percel.findByIdAndUpdate(
    { _id: percelId },
    {
      $push: {
        trackingEvents: {
          status: DELIVERY_STATUS.RETURNED_REQUEST,
          location: percel.receiverAddress,
          note: "Create Return Request",
          timestamp: new Date(),
        },
      },
    },
    { new: true }
  );

  return result;
};

export const percelServices = {
  createPercelSevice,
  deletePercelService,
  getAllPercelService,
  getPercelByIdService,
  updatePercelService,
  getPercelInfoBySenderService,
  getPercelInByTrackinIdService,
  returnPercelTrackinIdService,
 getPercelInfoByReceiverService,
 confrimationByReceiverService
};
