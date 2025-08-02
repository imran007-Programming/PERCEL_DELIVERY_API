"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationError = void 0;
var handleValidationError = function (err) {
    var errorSources = [];
    var errors = Object.values(err.errors);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors.forEach(function (errorObject) {
        return errorSources.push({
            path: errorObject.path,
            message: errorObject.message,
        });
    });
    return {
        statusCode: 400,
        message: "validation error",
        errorSources: errorSources,
    };
};
exports.handleValidationError = handleValidationError;
