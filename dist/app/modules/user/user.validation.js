"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserZodSchema = exports.userZodSchema = void 0;
var zod_1 = __importDefault(require("zod"));
var user_interface_1 = require("./user.interface");
exports.userZodSchema = zod_1.default.object({
    name: zod_1.default.string({
        error: function (issue) {
            return issue.input === undefined ? "Name is required" : "Invalid input";
        },
    }),
    shopName: zod_1.default.string({
        error: function (issue) {
            return issue.input === undefined ? "Shop Name is required" : "Invalid input";
        },
    }).optional(),
    email: zod_1.default.email({
        error: function (issue) {
            return issue.input === undefined ? "Email is required" : "Invalid email format";
        },
    }),
    password: zod_1.default
        .string()
        .min(8, { error: "Password must be at least 8 characters" })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        error: "Password must include at least one special character",
    }),
    phone: zod_1.default
        .string()
        .regex(/^(?:\+88)?01[3-9]\d{8}$/, "Phone number must be a valid Bangladeshi mobile number (e.g., 017XXXXXXXX or +88017XXXXXXXX)"),
    picture: zod_1.default.string().url().optional(),
    address: zod_1.default
        .string({
        error: "Address must be string",
    })
        .max(200, { error: "Address is too long" }),
    role: zod_1.default.enum(Object.values(user_interface_1.Role)).optional(),
});
/* update zodSchema  */
exports.updateUserZodSchema = zod_1.default.object({
    name: zod_1.default.string().optional(),
    /* Psaaword should be 1 upperCase ,special case,1 digit,8 character min */
    password: zod_1.default
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .refine(function (val) { return /[A-Z]/.test(val); }, {
        message: "Password must contain at least one uppercase letter",
    })
        .refine(function (val) { return /\d/.test(val); }, {
        message: "Password must contain at least one digit",
    }).refine(function (val) { return /[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?`~]/.test(val); }, {
        message: "Password must contain at least one special character",
    }).optional(),
    phone: zod_1.default
        .string()
        .regex(/^(?:\+88)?01[3-9]\d{8}$/, "Phone number must be a valid Bangladeshi mobile number (e.g., 017XXXXXXXX or +88017XXXXXXXX)")
        .optional(),
    role: zod_1.default.enum(Object.values(user_interface_1.Role)).optional(),
    isActive: zod_1.default.enum(Object.values(user_interface_1.ISActive)).optional(),
    isDeleted: zod_1.default.boolean("isDeleted must be true or false").optional(),
    isVerified: zod_1.default.boolean("isVerified must be true or false").optional(),
    address: zod_1.default
        .string({
        error: "Address must be string",
    })
        .max(200, { error: "Address is too long" })
        .optional(),
});
