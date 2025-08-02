"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
var express_1 = require("express");
var auth_controller_1 = require("./auth.controller");
var user_interface_1 = require("../user/user.interface");
var authMiddlewares_1 = require("../../middlewares/authMiddlewares");
var router = (0, express_1.Router)();
/* login route */
router.post("/login", auth_controller_1.authController.loginUser);
/* create a accessToken from a refreshToken Route */
router.post("/refresh-token", auth_controller_1.authController.getNewAccessToken);
/* logout route */
router.post("/logout", auth_controller_1.authController.logout);
/* reset password */
router.post("/reset-password", authMiddlewares_1.checkAuth.apply(void 0, Object.values(user_interface_1.Role)), auth_controller_1.authController.resetPassword);
exports.authRoutes = router;
