"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVars = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var loadlEnvVariables = function () {
    var envVariables = [
        "PORT",
        "DB_URL",
        "NODE_ENV",
        "SALT_ROUND",
        "JWT_SECRET",
        "JWT_EXPIRES_IN",
        "JWT_REFRESH_SECRET",
        "JWT_REFRESH_SECRET_EXPIRES",
        "USER_EMAIL",
        "APP_PASSWORD",
    ];
    envVariables.forEach(function (key) {
        if (!process.env[key]) {
            throw new Error("Missing env variable:".concat(key));
        }
    });
    return {
        PORT: process.env.PORT,
        DB_URL: process.env.DB_URL,
        NODE_ENV: process.env.NODE_ENV,
        SALT_ROUND: process.env.SALT_ROUND,
        JWT_SECRET: process.env.JWT_SECRET,
        JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
        JWT_REFRESH_SECRET_EXPIRES: process.env
            .JWT_REFRESH_SECRET_EXPIRES,
        USER_EMAIL: process.env.USER_EMAIL,
        APP_PASSWORD: process.env.APP_PASSWORD,
    };
};
exports.envVars = loadlEnvVariables();
