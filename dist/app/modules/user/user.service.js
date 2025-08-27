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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var http_status_codes_1 = __importDefault(require("http-status-codes"));
var AppError_1 = __importDefault(require("../../errorHelper/AppError"));
var user_interface_1 = require("./user.interface");
var user_model_1 = require("./user.model");
var env_1 = require("../../config/env");
var QueryBuilder_1 = require("../../utils/QueryBuilder");
var user_constant_1 = require("./user.constant");
var createUserService = function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, name, address, phone, rest, existUser, authProvider, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = payload.email, password = payload.password, name = payload.name, address = payload.address, phone = payload.phone, rest = __rest(payload, ["email", "password", "name", "address", "phone"]);
                return [4 /*yield*/, user_model_1.User.findOne({ email: email })];
            case 1:
                existUser = _a.sent();
                if (!existUser) return [3 /*break*/, 4];
                if (!!existUser.password) return [3 /*break*/, 3];
                if (password)
                    existUser.password = password;
                if (name) {
                    existUser.name = payload.name || existUser.name;
                }
                if (address) {
                    existUser.address = payload.address || existUser.address;
                }
                if (phone) {
                    existUser.phone = payload.phone || existUser.phone;
                }
                return [4 /*yield*/, existUser.save()];
            case 2:
                _a.sent();
                return [2 /*return*/, existUser];
            case 3: throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "user already Exist please log in");
            case 4:
                authProvider = {
                    provider: "credentials",
                    providerId: email,
                };
                return [4 /*yield*/, user_model_1.User.create(__assign({ email: email, password: password, name: name, address: address, phone: phone, auths: [authProvider] }, rest))];
            case 5:
                user = _a.sent();
                return [2 /*return*/, user];
        }
    });
}); };
/* GEt Me Service */
var GetMeService = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_model_1.User.findById(userId).select("-password")];
            case 1:
                user = _a.sent();
                return [2 /*return*/, {
                        data: user,
                    }];
        }
    });
}); };
/* get all user service */
var getAllUserService = function (query) { return __awaiter(void 0, void 0, void 0, function () {
    var queryBuilder, user, _a, userData, meta;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                queryBuilder = new QueryBuilder_1.QueryBuilder(user_model_1.User.find(), query);
                user = queryBuilder
                    .filter()
                    .search(user_constant_1.userSearchableFields)
                    .sort()
                    .fields()
                    .paginate();
                return [4 /*yield*/, Promise.all([
                        user.build(),
                        queryBuilder.getMeta(),
                    ])];
            case 1:
                _a = _b.sent(), userData = _a[0], meta = _a[1];
                return [2 /*return*/, {
                        userData: userData,
                        meta: meta,
                    }];
        }
    });
}); };
/* delete user service */
var deleteUserService = function (userID) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_model_1.User.findByIdAndDelete(userID)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
/* update a user service */
var updateUserService = function (userId, payload, decodedToken) { return __awaiter(void 0, void 0, void 0, function () {
    var existUser, hashPassword, newUpdateUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_model_1.User.findById(userId)];
            case 1:
                existUser = _a.sent();
                if (!existUser) {
                    throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User dosen't exist");
                }
                /* check role */
                if (payload.role) {
                    if (decodedToken.role === user_interface_1.Role.RECEIVER ||
                        decodedToken.role === user_interface_1.Role.SENDER) {
                        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "you are not authorized");
                    }
                }
                if (payload.isActive || payload.isVerified || payload.isDeleted) {
                    if (decodedToken.role === user_interface_1.Role.SENDER ||
                        decodedToken.role === user_interface_1.Role.RECEIVER) {
                        throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "you are not authorized");
                    }
                }
                if (!payload.password) return [3 /*break*/, 3];
                return [4 /*yield*/, bcrypt_1.default.hash(payload.password, env_1.envVars.SALT_ROUND)];
            case 2:
                hashPassword = _a.sent();
                payload.password = hashPassword;
                _a.label = 3;
            case 3: return [4 /*yield*/, user_model_1.User.findByIdAndUpdate(userId, payload, {
                    new: true,
                    runValidators: true,
                })];
            case 4:
                newUpdateUser = _a.sent();
                return [2 /*return*/, newUpdateUser];
        }
    });
}); };
/* block a user */
var blockUserService = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var existUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_model_1.User.findById(userId)];
            case 1:
                existUser = _a.sent();
                if (!existUser) {
                    throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User dosen't exist");
                }
                if (existUser.isActive === user_interface_1.ISActive.BLOCKED) {
                    throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "User already blocked");
                }
                existUser.isActive = user_interface_1.ISActive.BLOCKED;
                return [4 /*yield*/, existUser.save()];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
/* unblock a user */
var unblockUserService = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var existUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_model_1.User.findById(userId)];
            case 1:
                existUser = _a.sent();
                if (!existUser) {
                    throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User dosen't exist");
                }
                existUser.isActive = user_interface_1.ISActive.ACTIVE;
                return [4 /*yield*/, existUser.save()];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.userServices = {
    createUserService: createUserService,
    GetMeService: GetMeService,
    getAllUserService: getAllUserService,
    deleteUserService: deleteUserService,
    updateUserService: updateUserService,
    blockUserService: blockUserService,
    unblockUserService: unblockUserService,
};
