
import { Types } from "mongoose";

export enum ISActive{
    ACTIVE="ACTIVE",
    BLOCKED="BLOCKED",
}
export enum Role{
    ADMIN="ADMIN",
    SENDER="SENDER",
    RECEIVER="RECEIVER",
    DELIVERY_AGENT="DELIVERY_AGENT"
}
export interface IAuthProvider {
  provider: "google" | "credentials" /* google ,Credential */;
  providerId: string;
}

export interface IUser{
    _id?:Types.ObjectId,
    name:string,
    shopName?:string,
    email:string,
    password:string,
    phone:string,
    picture?:string,
    address:string,
    isActive?:ISActive;
    isDeleted?:boolean;
    isVerified?:boolean;
    role:Role;
    parcel?:Types.ObjectId[];
    auths:IAuthProvider[]


}