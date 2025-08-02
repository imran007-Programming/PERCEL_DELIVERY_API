"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
var validationRequest_1 = require("./../../middlewares/validationRequest");
var express_1 = require("express");
var user_controller_1 = require("./user.controller");
var user_validation_1 = require("./user.validation");
var authMiddlewares_1 = require("../../middlewares/authMiddlewares");
var user_interface_1 = require("./user.interface");
var route = (0, express_1.Router)();
route.post("/register", (0, validationRequest_1.zodValidation)(user_validation_1.userZodSchema), user_controller_1.userControllers.createUser);
/* get all user */
route.get("/allusers", (0, authMiddlewares_1.checkAuth)(user_interface_1.Role.ADMIN), user_controller_1.userControllers.getAllusers);
/* delete a user */
route.delete("/delete/:userId", (0, authMiddlewares_1.checkAuth)(user_interface_1.Role.ADMIN), user_controller_1.userControllers.deleteUser);
/* update a user */
route.patch("/update/:userId", (0, validationRequest_1.zodValidation)(user_validation_1.updateUserZodSchema), authMiddlewares_1.checkAuth.apply(void 0, Object.values(user_interface_1.Role)), user_controller_1.userControllers.updateUser);
/* block a user  */
route.patch("/block/:userId", (0, authMiddlewares_1.checkAuth)(user_interface_1.Role.ADMIN), user_controller_1.userControllers.blockUser);
/* Unblock a user  */
route.patch("/unblock/:userId", (0, authMiddlewares_1.checkAuth)(user_interface_1.Role.ADMIN), user_controller_1.userControllers.unblockUser);
exports.userRoutes = route;
