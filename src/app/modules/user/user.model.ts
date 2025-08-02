import { model, Schema } from "mongoose";
import { IAuthProvider, ISActive, IUser, Role } from "./user.interface";
import bcryptjs from "bcrypt"
import { envVars } from "../../config/env";
const authProviderSchema = new Schema<IAuthProvider>(
  {
    provider: { type: String, required: true },
    providerId: { type: String, required: true },
  },
  {
    versionKey: false,
    _id: false,
  }
);

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    shopName:{type:String},
    email: { type: String, required: true, unique: true },
    password: { type: String},
    role: {
      type: String,
      uppercase:true,
      enum: Object.values(Role),
      default: Role.SENDER,
    },
    phone: { type: String,required: true, },
    picture: { type: String },
    address: { type: String ,required: true,},
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: String,
      enum: Object.values(ISActive),
      default: ISActive.ACTIVE,
    },
    
    isVerified: { type: Boolean, default: false },
    auths: [authProviderSchema],
  
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save",async function(next){
  if(!this.isModified("password")){
    return next()
  }
  const hashPassword = await bcryptjs.hash(this.password as string,Number(envVars.SALT_ROUND))
  this.password= hashPassword;
  next()
})

export const User = model<IUser>("User", userSchema);
