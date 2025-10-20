"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var messageSchema = new mongoose_1.default.Schema({
    roomId: { type: String, required: true },
    user: { type: String, required: true },
    text: { type: String, required: true },
    time: { type: Date, default: Date.now },
});
exports.Message = mongoose_1.default.model("Message", messageSchema);
