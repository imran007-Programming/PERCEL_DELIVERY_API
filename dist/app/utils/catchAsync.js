"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = void 0;
var env_1 = require("../config/env");
var catchAsync = function (fn) {
    return function (req, res, next) {
        Promise.resolve(fn(req, res, next)).catch(function (err) {
            if (env_1.envVars.NODE_ENV === "development") {
                console.log(err);
            }
            next(err);
        });
    };
};
exports.catchAsync = catchAsync;
