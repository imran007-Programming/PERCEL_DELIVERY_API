import { z } from "zod";
import { Types } from "mongoose";
import { DELIVERY_STATUS } from "./percel.interface";

// Optional: Custom validator for MongoDB ObjectId
const objectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid ObjectId",
});


export const singleTrackingEventSchema = z.object({
  status: z.enum([
    DELIVERY_STATUS.PENDING,
    DELIVERY_STATUS.PICKED,
    DELIVERY_STATUS.IN_TRANSIT,
    DELIVERY_STATUS.DELIVERED,
    DELIVERY_STATUS.CANCELED,
  ]),
  location: z.string().min(1, "Location is required"),
  note: z.string(),
  timestamp: z.string().datetime().optional(), 
});

export const createPercelZodSchema = z.object({
  name: z.string("reciever name is require"),
  phone: z.string("reciever phoneNumber is require"),
  address: z.string("reciever address is require"),
  email: z.string("reciever email is require"),
  senderInfo: objectIdSchema,
  percelType: z.string().min(1, "Percel type is required"),
  weight: z.object({
    value: z.number().positive("Weight must be positive"),
    unit: z.enum(["kg", "g"]),
  }),
  pickupAddress: z.string().optional(),
  dispatchLocation: z.string().min(1, "Dispatch location is required"),
  fee: z.number().nonnegative("Fee must be a non-negative number"),
  estimate_deleivery_date: z.coerce.date(),
  deliveredAt: z.coerce.date().optional(),
  isPaid: z.boolean().optional(),
  currentLocation: z.string().optional(),
  deliveryAgent: objectIdSchema.optional(),
  notes: z.string().optional(),
  receiverAddress:z.string().optional(),

});
export const updatePercelZodSchema = z.object({
  name: z.string("reciever name is require").optional(),
  phone: z.string("reciever phoneNumber is require").optional(),
  address: z.string("reciever address is require").optional(),
  email: z.string("reciever email is require").optional(),
  senderInfo: objectIdSchema.optional(),
  percelType: z.string().min(1, "Percel type is required").optional(),
  weight: z.object({
    value: z.number().positive("Weight must be positive"),
    unit: z.enum(["kg", "g"]),
  }).optional(),
  pickupAddress: z.string().optional(),
  dispatchLocation: z.string().min(1, "Dispatch location is required").optional(),
  fee: z.number().nonnegative("Fee must be a non-negative number").optional(),
  estimate_deleivery_date: z.coerce.date().optional(),
  deliveredAt: z.coerce.date().optional().optional(),
  isPaid: z.boolean().optional().optional(),
  currentLocation: z.string().optional().optional(),
  deliveryAgent: objectIdSchema.optional().optional(),
  receiverAddress:z.string().optional().optional(),
  trackingEvents: z.array(singleTrackingEventSchema).nonempty("At least one tracking event required"),
});
