import { Types } from "mongoose";

export enum DELIVERY_STATUS {
  PENDING = "PENDING",
  PICKED = "PICKED",
  IN_TRANSIT = "IN_TRANSIT",
  DELIVERED = "DELIVERED",
  CANCELED = "CANCELED",
  RETURNED_REQUEST = "RETURNED_REQUEST",
}

/* interface for trackingEvent */

export interface ITrackingEvent {
  status: DELIVERY_STATUS;
  location: string;
  note?: string;
  timestamp: Date;
}

export interface IPercel {
  _id?: Types.ObjectId;
  senderInfo: Types.ObjectId;
  reciverInfo: Types.ObjectId;

  percelType: string;
  weight: {
    value: number;
    unit: "kg" | "g";
  };
  trackingId: string;
  receiverAddress?: string;
  pickupAddress?: string;
  dispatchLocation: string;
  fee: number;
  estimate_delievery_date: Date;
  deliveredAt?: Date;
  isPaid?: boolean;
  currentLocation?: string;
  deliveryAgent?: Types.ObjectId;
  trackingEvents: ITrackingEvent[];
}
