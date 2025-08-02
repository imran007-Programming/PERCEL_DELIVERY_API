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
exports.authController = void 0;
var catchAsync_1 = require("../../utils/catchAsync");
var sendResponse_1 = require("../../utils/sendResponse");
var http_status_codes_1 = __importDefault(require("http-status-codes"));
var auth_service_1 = require("./auth.service");
var setCookies_1 = require("../../utils/setCookies");
var AppError_1 = __importDefault(require("../../errorHelper/AppError"));
var loginUser = (0, catchAsync_1.catchAsync)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, auth_service_1.authServices.loginUserService(res, req.body)];
            case 1:
                user = _a.sent();
                (0, sendResponse_1.sendResponse)(res, {
                    statusCode: http_status_codes_1.default.OK,
                    success: true,
                    message: "User loged in successfully",
                    data: user,
                });
                return [2 /*return*/];
        }
    });
}); });
/* create a new accesstoken from refereshtoken  */
var getNewAccessToken = (0, catchAsync_1.catchAsync)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken, tokenInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                refreshToken = req.cookies.refreshToken;
                if (!refreshToken) {
                    throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "No Refresh Token");
                }
                return [4 /*yield*/, auth_service_1.authServices.getNewAccessTokenService(refreshToken)];
            case 1:
                tokenInfo = _a.sent();
                (0, setCookies_1.setAuthCookies)(res, tokenInfo);
                (0, sendResponse_1.sendResponse)(res, {
                    statusCode: http_status_codes_1.default.OK,
                    success: true,
                    message: "Token Retrived successfully",
                    data: tokenInfo,
                });
                return [2 /*return*/];
        }
    });
}); });
/* logout controller */
var logout = (0, catchAsync_1.catchAsync)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });
        (0, sendResponse_1.sendResponse)(res, {
            statusCode: http_status_codes_1.default.OK,
            success: true,
            message: "User logout successfully",
            data: null,
        });
        return [2 /*return*/];
    });
}); });
/* Reset Password Controller */
var resetPassword = (0, catchAsync_1.catchAsync)(
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var decodedToken, newPassword, oldPassword;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                decodedToken = req.user;
                newPassword = req.body.newPassword;
                oldPassword = req.body.oldPassword;
                return [4 /*yield*/, auth_service_1.authServices.resetPassword(oldPassword, newPassword, decodedToken)];
            case 1:
                _a.sent();
                (0, sendResponse_1.sendResponse)(res, {
                    statusCode: http_status_codes_1.default.OK,
                    success: true,
                    message: "Passworrd Changed Successfully",
                    data: null,
                });
                return [2 /*return*/];
        }
    });
}); });
exports.authController = {
    loginUser: loginUser,
    getNewAccessToken: getNewAccessToken,
    logout: logout,
    resetPassword: resetPassword
};
