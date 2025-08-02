"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.genarateToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var genarateToken = function (payload, secret, expiredIn) {
    var token = jsonwebtoken_1.default.sign(payload, secret, {
        expiresIn: expiredIn,
    });
    return token;
};
exports.genarateToken = genarateToken;
/* verify the token */
var verifyToken = function (token, secret) {
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.verifyToken = verifyToken;
