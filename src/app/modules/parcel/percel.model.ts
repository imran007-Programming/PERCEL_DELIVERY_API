import { model, Schema } from "mongoose";
import { DELIVERY_STATUS, IPercel, ITrackingEvent } from "./percel.interface";

const trackingEventSchema = new Schema<ITrackingEvent>({
  status: {
    type: String,
    enum: Object.values(DELIVERY_STATUS),
    default: DELIVERY_STATUS.PENDING,
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
},{versionKey:false,_id:false});

const percelSchema = new Schema<IPercel>(
  {
    senderInfo: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reciverInfo: { type: Schema.Types.ObjectId, ref: "User", required: true },
    percelType: { type: String, required: true },
    weight: {
      value: { type: Number, required: true },
      unit: { type: String, enum: ["kg", "gm"], required: true },
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
    isConfirm:{
      type:Boolean,
      default:false
    },
    currentLocation: {
      type: String,
    },

    trackingEvents: [trackingEventSchema],
    dispatchLocation: { type: String, required: true },
    pickupAddress: { type: String },
    deliveryAgent: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true, versionKey: false }
);

export const Percel = model<IPercel>("Percel", percelSchema);
