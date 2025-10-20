"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiveUser = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var activeUserSchema = new mongoose_1.default.Schema({
    userId: String,
    roomId: String,
    userName: String,
    socketId: String,
    lastSeen: { type: Date, default: Date.now }
}, {
    versionKey: false
});
exports.ActiveUser = mongoose_1.default.model("ActiveUser", activeUserSchema);
