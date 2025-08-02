"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Percel = void 0;
var mongoose_1 = require("mongoose");
var percel_interface_1 = require("./percel.interface");
var trackingEventSchema = new mongoose_1.Schema({
    status: {
        type: String,
        enum: Object.values(percel_interface_1.DELIVERY_STATUS),
        default: percel_interface_1.DELIVERY_STATUS.PENDING,
    },
    location: {
        type: String,
        required: true,
    },
    note: {
        type: String,
        default: "",
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
}, { versionKey: false, _id: false });
var percelSchema = new mongoose_1.Schema({
    senderInfo: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    reciverInfo: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    percelType: { type: String, required: true },
    weight: {
        value: { type: Number, required: true },
        unit: { type: String, enum: ["kg", "g"], required: true },
    },
    receiverAddress: { type: String },
    trackingId: { type: String, required: true, unique: true },
    fee: { type: Number, required: true },
    estimate_delievery_date: { type: Date },
    deliveredAt: {
        type: Date,
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    currentLocation: {
        type: String,
    },
    trackingEvents: [trackingEventSchema],
    dispatchLocation: { type: String, required: true },
    pickupAddress: { type: String },
    deliveryAgent: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: false,
    },
}, { timestamps: true, versionKey: false });
exports.Percel = (0, mongoose_1.model)("Percel", percelSchema);
