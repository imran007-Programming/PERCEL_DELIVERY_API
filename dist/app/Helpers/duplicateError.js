"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.duplicateErrorHandler = void 0;
var duplicateErrorHandler = function (err) {
    var field = Object.keys(err.keyPattern)[0];
    var value = err.keyValue[field];
    return {
        statusCode: 400,
        message: "".concat(field, " ").concat(value, " already exist"),
    };
};
exports.duplicateErrorHandler = duplicateErrorHandler;
