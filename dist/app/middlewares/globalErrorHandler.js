"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
var env_1 = require("../config/env");
var duplicateError_1 = require("../Helpers/duplicateError");
var AppError_1 = __importDefault(require("../errorHelper/AppError"));
var handleValidationError_1 = require("../Helpers/handleValidationError");
var handleZodEreror_1 = require("../Helpers/handleZodEreror");
var handleCastError_1 = require("../Helpers/handleCastError");
var globalErrorHandler = function (error, req, res, next) {
    var errorsAray = [];
    var statusCode = 500;
    var message = "something went wrong ".concat(error.message);
    if (env_1.envVars.NODE_ENV === "development") {
        console.log(error);
    }
    /* duplicate error */
    if (error.code === 11000) {
        var simplyfiedError = (0, duplicateError_1.duplicateErrorHandler)(error);
        statusCode = simplyfiedError.statusCode;
        message = simplyfiedError.message;
    }
    //  /* zod Error */
    else if (error.name === "ZodError") {
        var simplifiedError = (0, handleZodEreror_1.handleZodError)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorsAray = simplifiedError.errorSources;
    }
    ///object id error
    else if (error.name === "CastError") {
        var simplyFiedError = (0, handleCastError_1.handleCastError)(error);
        statusCode = simplyFiedError.statusCode;
    }
    // mongoose validation error
    else if (error.name === "ValidationError") {
        var simplifiedError = (0, handleValidationError_1.handleValidationError)(error);
        statusCode = simplifiedError.statusCode;
        errorsAray = simplifiedError.errorSources;
        message = simplifiedError.message;
    }
    else if (error instanceof AppError_1.default) {
        statusCode = error.statusCode;
        message = error.message;
    }
    else if (error instanceof Error) {
        statusCode = 500;
        message = error.message;
    }
    res.status(statusCode).json({
        success: false,
        message: message,
        error: env_1.envVars.NODE_ENV === "development" ? error : null,
        errorsAray: errorsAray,
        stack: env_1.envVars.NODE_ENV === "development" ? error.stack : null,
    });
};
exports.globalErrorHandler = globalErrorHandler;
