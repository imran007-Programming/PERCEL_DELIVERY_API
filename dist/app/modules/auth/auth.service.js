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
exports.authServices = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
var bcrypt_1 = __importDefault(require("bcrypt"));
var http_status_codes_1 = __importDefault(require("http-status-codes"));
var AppError_1 = __importDefault(require("../../../app/errorHelper/AppError"));
var user_interface_1 = require("../user/user.interface");
var user_model_1 = require("../user/user.model");
var userToken_1 = require("../../utils/userToken");
var setCookies_1 = require("../../utils/setCookies");
var loginUserService = function (res, payload) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, ExistUser, isPasswordMatch, userToken, _a, newpass, rest;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                email = payload.email, password = payload.password;
                return [4 /*yield*/, user_model_1.User.findOne({ email: email })];
            case 1:
                ExistUser = _b.sent();
                if (!ExistUser) {
                    throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Email doesn't found");
                }
                if (!ExistUser.password) {
                    throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, "Account was auto-created. Please complete registration first.");
                }
                if (ExistUser.isActive === user_interface_1.ISActive.BLOCKED) {
                    throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "user is blocked");
                }
                if (!password) {
                    throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Password not provided");
                }
                return [4 /*yield*/, bcrypt_1.default.compare(password, ExistUser.password)];
            case 2:
                isPasswordMatch = _b.sent();
                if (!isPasswordMatch) {
                    throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Invalid email and password");
                }
                userToken = (0, userToken_1.createUserToken)(ExistUser);
                (0, setCookies_1.setAuthCookies)(res, userToken);
                _a = ExistUser.toObject(), newpass = _a.password, rest = __rest(_a, ["password"]);
                return [2 /*return*/, {
                        accessToken: userToken.accessToken,
                        refreshToken: userToken.refreshToken,
                        user: rest,
                    }];
        }
    });
}); };
/* get new accesstoken */
var getNewAccessTokenService = function (refreshToken) { return __awaiter(void 0, void 0, void 0, function () {
    var newAccessToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, userToken_1.createNewAccessTokenWithRefreshToken)(refreshToken)];
            case 1:
                newAccessToken = _a.sent();
                return [2 /*return*/, {
                        accessToken: newAccessToken,
                    }];
        }
    });
}); };
/* reset password */
// * Reset password Business Logic */
var resetPassword = function (oldPassword, newPassword, decodedToken) { return __awaiter(void 0, void 0, void 0, function () {
    var user, isOldPasswordMatch;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_model_1.User.findById(decodedToken.userId)];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User not found");
                }
                return [4 /*yield*/, bcrypt_1.default.compare(oldPassword, user.password)];
            case 2:
                isOldPasswordMatch = _a.sent();
                if (!isOldPasswordMatch) {
                    throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, "Old password doesn't match");
                }
                user.password = newPassword;
                return [4 /*yield*/, user.save()];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.authServices = {
    loginUserService: loginUserService,
    getNewAccessTokenService: getNewAccessTokenService,
    resetPassword: resetPassword
};
