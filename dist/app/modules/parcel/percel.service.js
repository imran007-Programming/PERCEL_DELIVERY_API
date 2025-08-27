"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.percelServices = void 0;
/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
var http_status_codes_1 = __importDefault(require("http-status-codes"));
var user_model_1 = require("../user/user.model");
var percel_interface_1 = require("./percel.interface");
var percel_model_1 = require("./percel.model");
var AppError_1 = __importDefault(require("../../errorHelper/AppError"));
var user_interface_1 = require("../user/user.interface");
var sendEmail_1 = require("../../utils/sendEmail");
var percel_constant_1 = require("./percel.constant");
var QueryBuilder_1 = require("../../utils/QueryBuilder");
/* create A percel */
var createPercelSevice = function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    var receiver, sender, generateTrackingId, createPercel, subject, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_model_1.User.findOne({ email: payload.recevierEmail })];
            case 1:
                receiver = _a.sent();
                return [4 /*yield*/, user_model_1.User.findOne({ _id: payload.senderInfo })];
            case 2:
                sender = _a.sent();
                if (!!receiver) return [3 /*break*/, 4];
                return [4 /*yield*/, user_model_1.User.create({
                        name: payload.recevierName,
                        email: payload.recevierEmail,
                        phone: payload.recevierPhone,
                        address: payload.recevierAddress,
                        role: user_interface_1.Role.RECEIVER,
                    })];
            case 3:
                receiver = _a.sent();
                _a.label = 4;
            case 4:
                generateTrackingId = function () {
                    return "TRK".concat(Date.now()).concat(Math.floor(Math.random() * 1000));
                };
                return [4 /*yield*/, percel_model_1.Percel.create({
                        senderInfo: payload.senderInfo,
                        reciverInfo: receiver._id,
                        percelType: payload.percelType,
                        weight: payload.weight,
                        trackingId: generateTrackingId(),
                        fee: payload.fee,
                        receiverAddress: receiver.address,
                        dispatchLocation: payload.dispatchLocation,
                        pickupAddress: payload.pickupAddress,
                        currentLocation: payload.currentLocation,
                        deliveredAt: payload.deliveredAt,
                        deliveryAgent: payload.deliveryAgent,
                        estimate_delievery_date: payload.estimate_delievery_date,
                        trackingEvents: [
                            {
                                status: percel_interface_1.DELIVERY_STATUS.PENDING,
                                location: payload.currentLocation || "Not given",
                                note: "percel created successfully",
                                timestamp: new Date(),
                            },
                        ],
                    })];
            case 5:
                createPercel = _a.sent();
                if (!(receiver === null || receiver === void 0 ? void 0 : receiver.email)) return [3 /*break*/, 7];
                subject = "Parcel Collected - Tracking ID: ".concat(createPercel.trackingId);
                message = "\nDear ".concat(receiver.name || "Customer", ",\n\nWe have collected your parcel (Tracking ID: ").concat(createPercel.trackingId, ") from ").concat(sender === null || sender === void 0 ? void 0 : sender.shopName, ".\n\nYou can track its status here:\n\uD83D\uDC49 https://percel-delievey-app.vercel.app/api/v1/percel/track/").concat(createPercel.trackingId, "\n\nThank you for choosing our service!\n\nBest regards,  \nParcel Delivery Team\n");
                return [4 /*yield*/, (0, sendEmail_1.sendEmail)(receiver.email, subject, message)];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7: return [2 /*return*/, createPercel];
        }
    });
}); };
/* get all percel */
var getAllPercelService = function (query) { return __awaiter(void 0, void 0, void 0, function () {
    var queryBuilder, percel, _a, percelData, meta;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                queryBuilder = new QueryBuilder_1.QueryBuilder(percel_model_1.Percel.find(), query);
                percel = queryBuilder
                    .filter()
                    .search(percel_constant_1.percelSearchableFields)
                    .sort()
                    .fields()
                    .paginate();
                return [4 /*yield*/, Promise.all([
                        percel.build(),
                        queryBuilder.getMeta(),
                    ])];
            case 1:
                _a = _b.sent(), percelData = _a[0], meta = _a[1];
                return [2 /*return*/, {
                        percelData: percelData,
                        meta: meta,
                    }];
        }
    });
}); };
/* get percel by senderInfo */
var getPercelInfoBySenderService = function (senderId, query) { return __awaiter(void 0, void 0, void 0, function () {
    var queryBuilder, percels, _a, percelData, meta;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                queryBuilder = new QueryBuilder_1.QueryBuilder(percel_model_1.Percel.find({ senderInfo: senderId }), query);
                percels = queryBuilder
                    .filter()
                    .search(percel_constant_1.percelSearchableFields)
                    .sort()
                    .fields()
                    .paginate();
                return [4 /*yield*/, Promise.all([
                        percels.build(),
                        queryBuilder.getMeta({ senderId: senderId }),
                    ])];
            case 1:
                _a = _b.sent(), percelData = _a[0], meta = _a[1];
                return [2 /*return*/, {
                        percelData: percelData,
                        meta: meta,
                    }];
        }
    });
}); };
/* get percel by receiverId */
var getPercelInfoByReceiverService = function (receiverId, query) { return __awaiter(void 0, void 0, void 0, function () {
    var queryBuilder, percels, _a, percelData, meta;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                queryBuilder = new QueryBuilder_1.QueryBuilder(percel_model_1.Percel.find({ reciverInfo: receiverId }), query);
                percels = queryBuilder
                    .filter()
                    .search(percel_constant_1.percelSearchableFields)
                    .sort()
                    .fields()
                    .paginate();
                return [4 /*yield*/, Promise.all([
                        percels.build(),
                        queryBuilder.getMeta({ receiverId: receiverId }),
                    ])];
            case 1:
                _a = _b.sent(), percelData = _a[0], meta = _a[1];
                return [2 /*return*/, {
                        percelData: percelData,
                        meta: meta,
                    }];
        }
    });
}); };
var confrimationByReceiverService = function (percelId) { return __awaiter(void 0, void 0, void 0, function () {
    var findPercel;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, percel_model_1.Percel.findOne({ _id: percelId })];
            case 1:
                findPercel = _a.sent();
                if (!findPercel) {
                    throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "percel not found");
                }
                // Update the isConfirm value to true
                findPercel.isConfirm = true;
                return [4 /*yield*/, findPercel.save()];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
/* get all percel */
var getPercelByIdService = function (percelId) { return __awaiter(void 0, void 0, void 0, function () {
    var existPercel;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, percel_model_1.Percel.findById(percelId)];
            case 1:
                existPercel = _a.sent();
                if (!existPercel) {
                    throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "percel not found");
                }
                return [4 /*yield*/, percel_model_1.Percel.findById(percelId)
                        .populate("senderInfo", "name phone address email")
                        .populate("reciverInfo", "name phone address email")];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
/* delete a percel */
var deletePercelService = function (percelId) { return __awaiter(void 0, void 0, void 0, function () {
    var findPercel;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, percel_model_1.Percel.findById(percelId)];
            case 1:
                findPercel = _a.sent();
                if (!findPercel) {
                    throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Percel not dound");
                }
                return [4 /*yield*/, percel_model_1.Percel.findByIdAndDelete(percelId)];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
/* update a percel */
var updatePercelService = function (percelId, payload, decodedToken) { return __awaiter(void 0, void 0, void 0, function () {
    var findPercel, role, allowedUpdateFields, lastStatus, newStatus, existingStatus, invalidFields, filteredPayload, updatedPercel;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, percel_model_1.Percel.findById(percelId)];
            case 1:
                findPercel = _d.sent();
                if (!findPercel) {
                    throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Parcel not found");
                }
                role = decodedToken.role;
                allowedUpdateFields = [];
                // Choose allowed fields by role
                if (role === user_interface_1.Role.ADMIN) {
                    allowedUpdateFields = [
                        "percelType",
                        "weight",
                        "fee",
                        "estimate_delievery_date",
                        "deliveredAt",
                        "isPaid",
                        "currentLocation",
                        "trackingEvents",
                        "dispatchLocation",
                        "pickupAddress",
                        "deliveryAgent",
                        "receiverAddress",
                    ];
                }
                else if (role === user_interface_1.Role.SENDER) {
                    lastStatus = (_b = (_a = findPercel.trackingEvents) === null || _a === void 0 ? void 0 : _a[findPercel.trackingEvents.length - 1]) === null || _b === void 0 ? void 0 : _b.status;
                    newStatus = payload.trackingEvents && payload.trackingEvents.length > 0
                        ? (_c = payload.trackingEvents[0]) === null || _c === void 0 ? void 0 : _c.status
                        : lastStatus;
                    existingStatus = findPercel.trackingEvents.map(function (value) { return value.status; });
                    if ((newStatus === percel_interface_1.DELIVERY_STATUS.CANCELED &&
                        [
                            percel_interface_1.DELIVERY_STATUS.PICKED,
                            percel_interface_1.DELIVERY_STATUS.IN_TRANSIT,
                            percel_interface_1.DELIVERY_STATUS.DELIVERED,
                        ].includes(lastStatus)) ||
                        existingStatus.includes(newStatus)) {
                        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "You cannot ".concat(newStatus, " the parcel because it is already ").concat(lastStatus));
                    }
                    allowedUpdateFields = ["trackingEvents"];
                }
                else if (role === user_interface_1.Role.DELIVERY_AGENT) {
                    allowedUpdateFields = ["currentLocation", "deliveredAt", "trackingEvents"];
                }
                else {
                    throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "You are not authorized to update");
                }
                invalidFields = Object.keys(payload).filter(function (key) { return !allowedUpdateFields.includes(key); });
                if (invalidFields.length > 0) {
                    throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "You are not authorized to change ".concat(invalidFields.join(" and "), " value"));
                }
                if (!(payload.trackingEvents &&
                    allowedUpdateFields.includes("trackingEvents"))) return [3 /*break*/, 3];
                return [4 /*yield*/, percel_model_1.Percel.findByIdAndUpdate(percelId, {
                        $push: { trackingEvents: { $each: payload.trackingEvents } },
                    })];
            case 2:
                _d.sent();
                _d.label = 3;
            case 3:
                filteredPayload = Object.fromEntries(Object.entries(payload).filter(function (_a) {
                    var key = _a[0];
                    return key !== "trackingEvents" &&
                        allowedUpdateFields.includes(key);
                }));
                return [4 /*yield*/, percel_model_1.Percel.findByIdAndUpdate(percelId, filteredPayload, {
                        new: true,
                        runValidators: true,
                    })];
            case 4:
                updatedPercel = _d.sent();
                return [2 /*return*/, updatedPercel];
        }
    });
}); };
/* get percel by trackingId for user/receiver */
var getPercelInByTrackinIdService = function (trackingId) { return __awaiter(void 0, void 0, void 0, function () {
    var percel, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, percel_model_1.Percel.findOne({ trackingId: trackingId })
                    .select("-_id trackingEvents reciverInfo")
                    .populate({
                    path: "reciverInfo",
                    select: "name email phone address -_id",
                })
                    .populate({
                    path: "trackingEvents",
                    select: "status note location timestamp",
                })];
            case 1:
                percel = _a.sent();
                if (!percel) {
                    throw new AppError_1.default(403, "percel not found");
                }
                result = __assign(__assign({}, percel.toObject()), { trackingEvents: percel.trackingEvents.map(function (event) { return ({
                        status: event.status,
                        curreentLocation: event.location,
                        note: event.note,
                        arrivedAt: event.timestamp,
                    }); }) });
                return [2 /*return*/, result];
        }
    });
}); };
var returnPercelTrackinIdService = function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    var percel, existUser, percelId, lastStatus, result;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, percel_model_1.Percel.findOne({ trackingId: payload.trackingId })];
            case 1:
                percel = _c.sent();
                return [4 /*yield*/, user_model_1.User.findOne({ phone: payload.phone })];
            case 2:
                existUser = _c.sent();
                percelId = percel === null || percel === void 0 ? void 0 : percel._id;
                if (!percel) {
                    throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "parcel not found");
                }
                if (!existUser) {
                    throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "user not found");
                }
                if (existUser.role !== user_interface_1.Role.RECEIVER) {
                    throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "you are not able to return the percel");
                }
                lastStatus = (_b = (_a = percel.trackingEvents) === null || _a === void 0 ? void 0 : _a[percel.trackingEvents.length - 1]) === null || _b === void 0 ? void 0 : _b.status;
                if (lastStatus !== percel_interface_1.DELIVERY_STATUS.DELIVERED) {
                    throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "You can't return the percel until it's delevered");
                }
                return [4 /*yield*/, percel_model_1.Percel.findByIdAndUpdate({ _id: percelId }, {
                        $push: {
                            trackingEvents: {
                                status: percel_interface_1.DELIVERY_STATUS.RETURNED_REQUEST,
                                location: percel.receiverAddress,
                                note: "Create Return Request",
                                timestamp: new Date(),
                            },
                        },
                    }, { new: true })];
            case 3:
                result = _c.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.percelServices = {
    createPercelSevice: createPercelSevice,
    deletePercelService: deletePercelService,
    getAllPercelService: getAllPercelService,
    getPercelByIdService: getPercelByIdService,
    updatePercelService: updatePercelService,
    getPercelInfoBySenderService: getPercelInfoBySenderService,
    getPercelInByTrackinIdService: getPercelInByTrackinIdService,
    returnPercelTrackinIdService: returnPercelTrackinIdService,
    getPercelInfoByReceiverService: getPercelInfoByReceiverService,
    confrimationByReceiverService: confrimationByReceiverService,
};
