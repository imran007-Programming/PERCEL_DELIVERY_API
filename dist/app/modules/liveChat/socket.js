"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketInit = socketInit;
var socket_io_1 = require("socket.io");
var ActiveUserSchema_1 = require("./ActiveUserSchema");
var ChatSchema_1 = require("./ChatSchema");
var io;
function socketInit(server) {
    var _this = this;
    io = new socket_io_1.Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL,
            methods: ["GET", "POST"],
        },
    });
    // connect the socekt io
    io.on("connection", function (socket) {
        console.log("User Connected:", socket.id);
        socket.on("user-online", function (_a) { return __awaiter(_this, [_a], void 0, function (_b) {
            var users;
            var userId = _b.userId, userName = _b.userName, roomId = _b.roomId;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!userId)
                            return [2 /*return*/];
                        return [4 /*yield*/, ActiveUserSchema_1.ActiveUser.findOneAndUpdate({ userId: userId }, { userName: userName, socketId: socket.id, roomId: roomId, lastSeen: new Date() }, { upsert: true, new: true })];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, ActiveUserSchema_1.ActiveUser.find({})];
                    case 2:
                        users = _c.sent();
                        io === null || io === void 0 ? void 0 : io.emit("active-users", users);
                        return [2 /*return*/];
                }
            });
        }); });
        // join a private room
        socket.on("join-room", function (_a) { return __awaiter(_this, [_a], void 0, function (_b) {
            var messages;
            var roomId = _b.roomId;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        socket.join(roomId);
                        return [4 /*yield*/, ChatSchema_1.Message.find({ roomId: roomId }).sort({ time: 1 })];
                    case 1:
                        messages = _c.sent();
                        socket.emit("chat-history", messages);
                        return [2 /*return*/];
                }
            });
        }); });
        // indicate that user is typing
        socket.on("typing", function (_a) {
            var roomId = _a.roomId, userName = _a.userName;
            console.log("".concat(userName, " is typing..."));
            socket.to(roomId).emit("typing", { userName: userName });
        });
        // indicate user stopped typing
        socket.on("stop-typing", function (_a) {
            var roomId = _a.roomId, userName = _a.userName;
            console.log("".concat(userName, " stopped typing"));
            socket.to(roomId).emit("stop-typing", { userName: userName });
        });
        // handle message//
        socket.on("message", function (_a) { return __awaiter(_this, [_a], void 0, function (_b) {
            var messageData, message, error_1;
            var roomId = _b.roomId, user = _b.user, text = _b.text;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        messageData = { roomId: roomId, user: user, text: text, time: new Date() };
                        // 1️⃣ Instantly broadcast to all users (including sender)
                        io === null || io === void 0 ? void 0 : io.to(roomId).emit("message", messageData);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        message = new ChatSchema_1.Message(messageData);
                        return [4 /*yield*/, message.save()];
                    case 2:
                        _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _c.sent();
                        console.error("Failed to save message:", error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        /* send the Active user to the admin(dashboard)  */
        socket.on("getActiveUserForAdmin", function () { return __awaiter(_this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ActiveUserSchema_1.ActiveUser.find({})];
                    case 1:
                        users = _a.sent();
                        socket.emit("active-users", users);
                        return [2 /*return*/];
                }
            });
        }); });
        ///Remove the user if he leaved the room
        socket.on("leave-room", function (_a) { return __awaiter(_this, [_a], void 0, function (_b) {
            var users;
            var roomId = _b.roomId;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        socket.leave(roomId);
                        return [4 /*yield*/, ActiveUserSchema_1.ActiveUser.findOneAndDelete({ socketId: socket.id })];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, ActiveUserSchema_1.ActiveUser.find({ roomId: roomId })];
                    case 2:
                        users = _c.sent();
                        io === null || io === void 0 ? void 0 : io.to(roomId).emit("active-users", users);
                        return [2 /*return*/];
                }
            });
        }); });
        /* disconnect the socket  */
        socket.on("disconnect", function (reason) { return __awaiter(_this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ActiveUserSchema_1.ActiveUser.findOneAndDelete({ socketId: socket.id })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, ActiveUserSchema_1.ActiveUser.find({})];
                    case 2:
                        users = _a.sent();
                        io === null || io === void 0 ? void 0 : io.emit("active-users", users);
                        console.log("User Disconnected", socket.id, "resone:", reason);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    return io;
}
