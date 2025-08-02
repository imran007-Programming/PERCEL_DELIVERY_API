import z from "zod";
import { ISActive, Role } from "./user.interface";

export const userZodSchema = z.object({
  name: z.string({
    error: (issue) =>
      issue.input === undefined ? "Name is required" : "Invalid input",
  }),
  shopName: z.string({
    error: (issue) =>
      issue.input === undefined ? "Shop Name is required" : "Invalid input",
  }).optional(),
  email: z.email({
    error: (issue) =>
      issue.input === undefined ? "Email is required" : "Invalid email format",
  }),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters" })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      error: "Password must include at least one special character",
    }),
  phone: z
    .string()
    .regex(
      /^(?:\+88)?01[3-9]\d{8}$/,
      "Phone number must be a valid Bangladeshi mobile number (e.g., 017XXXXXXXX or +88017XXXXXXXX)"
    ),
  picture: z.string().url().optional(),
  address: z
    .string({
      error: "Address must be string",
    })
    .max(200, { error: "Address is too long" }),
    role:z.enum(Object.values(Role) as [string]).optional(),
 
});



/* update zodSchema  */
export const updateUserZodSchema = z.object({
  name: z.string().optional(),
  /* Psaaword should be 1 upperCase ,special case,1 digit,8 character min */
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .refine((val) => /[A-Z]/.test(val), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((val) => /\d/.test(val), {
      message: "Password must contain at least one digit",
    })
   .refine((val) => /[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?`~]/.test(val), {
  message: "Password must contain at least one special character",
}).optional(),
    
  phone: z
    .string()
    .regex(
      /^(?:\+88)?01[3-9]\d{8}$/,
      "Phone number must be a valid Bangladeshi mobile number (e.g., 017XXXXXXXX or +88017XXXXXXXX)"
    )
    .optional(),
  role: z.enum(Object.values(Role) as [string]).optional(),
  isActive: z.enum(Object.values(ISActive) as [string]).optional(),
  isDeleted: z.boolean("isDeleted must be true or false").optional(),
  isVerified: z.boolean("isVerified must be true or false").optional(),
  address: z
    .string({
      error: "Address must be string",
    })
    .max(200, { error: "Address is too long" })
    .optional(),
});
