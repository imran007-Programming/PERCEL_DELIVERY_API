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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.percelController = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
var http_status_codes_1 = __importDefault(require("http-status-codes"));
var sendResponse_1 = require("../../utils/sendResponse");
var catchAsync_1 = require("../../utils/catchAsync");
var percel_service_1 = require("./percel.service");
/* create percel controller */
var createPercel = (0, catchAsync_1.catchAsync)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var percel;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, percel_service_1.percelServices.createPercelSevice(req.body)];
            case 1:
                percel = _a.sent();
                (0, sendResponse_1.sendResponse)(res, {
                    statusCode: http_status_codes_1.default.CREATED,
                    success: true,
                    message: "percel created Succesfully",
                    data: percel,
                });
                return [2 /*return*/];
        }
    });
}); });
/* get Allpercel controller */
var getAllPercel = (0, catchAsync_1.catchAsync)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, percelData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = req.query;
                return [4 /*yield*/, percel_service_1.percelServices.getAllPercelService(query)];
            case 1:
                percelData = _a.sent();
                (0, sendResponse_1.sendResponse)(res, {
                    statusCode: http_status_codes_1.default.OK,
                    success: true,
                    message: "percel Retrived Succesfully",
                    data: percelData,
                });
                return [2 /*return*/];
        }
    });
}); });
/* get percel details by senderinfo */
var getPercelInfo = (0, catchAsync_1.catchAsync)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var senderId, query, percel;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                senderId = req.params.senderId;
                query = req.query;
                return [4 /*yield*/, percel_service_1.percelServices.getPercelInfoBySenderService(senderId, query)];
            case 1:
                percel = _a.sent();
                (0, sendResponse_1.sendResponse)(res, {
                    statusCode: http_status_codes_1.default.OK,
                    success: true,
                    message: "percel retrived Succesfully",
                    data: percel,
                });
                return [2 /*return*/];
        }
    });
}); });
/* get all incomeing percel by receiverId */
var getPercelInfoByReceiver = (0, catchAsync_1.catchAsync)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var receiverId, query, percel;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                receiverId = req.params.receiverId;
                query = req.query;
                return [4 /*yield*/, percel_service_1.percelServices.getPercelInfoByReceiverService(receiverId, query)];
            case 1:
                percel = _a.sent();
                (0, sendResponse_1.sendResponse)(res, {
                    statusCode: http_status_codes_1.default.OK,
                    success: true,
                    message: "percel retrived Succesfully",
                    data: percel,
                });
                return [2 /*return*/];
        }
    });
}); });
var setConfirmation = (0, catchAsync_1.catchAsync)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var percelId, percel;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                percelId = req.params.percelId;
                return [4 /*yield*/, percel_service_1.percelServices.confrimationByReceiverService(percelId)];
            case 1:
                percel = _a.sent();
                (0, sendResponse_1.sendResponse)(res, {
                    statusCode: http_status_codes_1.default.OK,
                    success: true,
                    message: "percel confirm Succesfully",
                    data: null,
                });
                return [2 /*return*/];
        }
    });
}); });
/* get Allpercel controller */
var getPercelById = (0, catchAsync_1.catchAsync)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var percelId, percel;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                percelId = req.params.percelId;
                return [4 /*yield*/, percel_service_1.percelServices.getPercelByIdService(percelId)];
            case 1:
                percel = _a.sent();
                (0, sendResponse_1.sendResponse)(res, {
                    statusCode: http_status_codes_1.default.OK,
                    success: true,
                    message: "percel Retrived Succesfully",
                    data: percel,
                });
                return [2 /*return*/];
        }
    });
}); });
/* delete percel controller */
var deletePercel = (0, catchAsync_1.catchAsync)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var percelId, percel;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                percelId = req.params.percelId;
                return [4 /*yield*/, percel_service_1.percelServices.deletePercelService(percelId)];
            case 1:
                percel = _a.sent();
                (0, sendResponse_1.sendResponse)(res, {
                    statusCode: http_status_codes_1.default.OK,
                    success: true,
                    message: "percel deleted Succesfully",
                    data: percel,
                });
                return [2 /*return*/];
        }
    });
}); });
/* delete percel controller */
var updatePercel = (0, catchAsync_1.catchAsync)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var percelId, payload, decodedToken, percel;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                percelId = req.params.percelId;
                payload = req.body;
                decodedToken = req.user;
                return [4 /*yield*/, percel_service_1.percelServices.updatePercelService(percelId, payload, decodedToken)];
            case 1:
                percel = _a.sent();
                (0, sendResponse_1.sendResponse)(res, {
                    statusCode: http_status_codes_1.default.OK,
                    success: true,
                    message: "Parcel updated successfully",
                    data: percel,
                });
                return [2 /*return*/];
        }
    });
}); });
/* get percel details by senderinfo */
var trackingPercel = (0, catchAsync_1.catchAsync)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var trackingId, percel;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                trackingId = req.params.trackingId;
                return [4 /*yield*/, percel_service_1.percelServices.getPercelInByTrackinIdService(trackingId)];
            case 1:
                percel = _a.sent();
                (0, sendResponse_1.sendResponse)(res, {
                    statusCode: http_status_codes_1.default.OK,
                    success: true,
                    message: "percel retrived Succesfully",
                    data: percel,
                });
                return [2 /*return*/];
        }
    });
}); });
/* return  percel */
var retrunPercel = (0, catchAsync_1.catchAsync)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var percel;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, percel_service_1.percelServices.returnPercelTrackinIdService(req.body)];
            case 1:
                percel = _a.sent();
                (0, sendResponse_1.sendResponse)(res, {
                    statusCode: http_status_codes_1.default.OK,
                    success: true,
                    message: "percel Returned Succesfully",
                    data: percel,
                });
                return [2 /*return*/];
        }
    });
}); });
exports.percelController = {
    createPercel: createPercel,
    deletePercel: deletePercel,
    getAllPercel: getAllPercel,
    getPercelById: getPercelById,
    updatePercel: updatePercel,
    getPercelInfo: getPercelInfo,
    trackingPercel: trackingPercel,
    retrunPercel: retrunPercel,
    getPercelInfoByReceiver: getPercelInfoByReceiver,
    setConfirmation: setConfirmation,
};
