"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthCookies = void 0;
var setAuthCookies = function (res, tokenInfo) {
    var cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
    };
    if (tokenInfo.accessToken) {
        res.cookie("accessToken", tokenInfo.accessToken, cookieOptions);
    }
    if (tokenInfo.refreshToken) {
        res.cookie("refreshToken", tokenInfo.refreshToken, cookieOptions);
    }
};
exports.setAuthCookies = setAuthCookies;
