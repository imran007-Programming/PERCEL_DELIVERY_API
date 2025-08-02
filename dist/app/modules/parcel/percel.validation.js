"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePercelZodSchema = exports.createPercelZodSchema = exports.singleTrackingEventSchema = void 0;
var zod_1 = require("zod");
var mongoose_1 = require("mongoose");
var percel_interface_1 = require("./percel.interface");
// Optional: Custom validator for MongoDB ObjectId
var objectIdSchema = zod_1.z.string().refine(function (val) { return mongoose_1.Types.ObjectId.isValid(val); }, {
    message: "Invalid ObjectId",
});
exports.singleTrackingEventSchema = zod_1.z.object({
    status: zod_1.z.enum([
        percel_interface_1.DELIVERY_STATUS.PENDING,
        percel_interface_1.DELIVERY_STATUS.PICKED,
        percel_interface_1.DELIVERY_STATUS.IN_TRANSIT,
        percel_interface_1.DELIVERY_STATUS.DELIVERED,
        percel_interface_1.DELIVERY_STATUS.CANCELED,
    ]),
    location: zod_1.z.string().min(1, "Location is required"),
    note: zod_1.z.string(),
    timestamp: zod_1.z.string().datetime().optional(),
});
exports.createPercelZodSchema = zod_1.z.object({
    name: zod_1.z.string("reciever name is require"),
    phone: zod_1.z.string("reciever phoneNumber is require"),
    address: zod_1.z.string("reciever address is require"),
    email: zod_1.z.string("reciever email is require"),
    senderInfo: objectIdSchema,
    percelType: zod_1.z.string().min(1, "Percel type is required"),
    weight: zod_1.z.object({
        value: zod_1.z.number().positive("Weight must be positive"),
        unit: zod_1.z.enum(["kg", "g"]),
    }),
    pickupAddress: zod_1.z.string().optional(),
    dispatchLocation: zod_1.z.string().min(1, "Dispatch location is required"),
    fee: zod_1.z.number().nonnegative("Fee must be a non-negative number"),
    estimate_deleivery_date: zod_1.z.coerce.date(),
    deliveredAt: zod_1.z.coerce.date().optional(),
    isPaid: zod_1.z.boolean().optional(),
    currentLocation: zod_1.z.string().optional(),
    deliveryAgent: objectIdSchema.optional(),
    notes: zod_1.z.string().optional(),
    receiverAddress: zod_1.z.string().optional(),
});
exports.updatePercelZodSchema = zod_1.z.object({
    name: zod_1.z.string("reciever name is require").optional(),
    phone: zod_1.z.string("reciever phoneNumber is require").optional(),
    address: zod_1.z.string("reciever address is require").optional(),
    email: zod_1.z.string("reciever email is require").optional(),
    senderInfo: objectIdSchema.optional(),
    percelType: zod_1.z.string().min(1, "Percel type is required").optional(),
    weight: zod_1.z.object({
        value: zod_1.z.number().positive("Weight must be positive"),
        unit: zod_1.z.enum(["kg", "g"]),
    }).optional(),
    pickupAddress: zod_1.z.string().optional(),
    dispatchLocation: zod_1.z.string().min(1, "Dispatch location is required").optional(),
    fee: zod_1.z.number().nonnegative("Fee must be a non-negative number").optional(),
    estimate_deleivery_date: zod_1.z.coerce.date().optional(),
    deliveredAt: zod_1.z.coerce.date().optional().optional(),
    isPaid: zod_1.z.boolean().optional().optional(),
    currentLocation: zod_1.z.string().optional().optional(),
    deliveryAgent: objectIdSchema.optional().optional(),
    receiverAddress: zod_1.z.string().optional().optional(),
    trackingEvents: zod_1.z.array(exports.singleTrackingEventSchema).nonempty("At least one tracking event required"),
});
