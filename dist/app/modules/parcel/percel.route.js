"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.percelRoutes = void 0;
var express_1 = require("express");
var percel_conroller_1 = require("./percel.conroller");
var authMiddlewares_1 = require("../../middlewares/authMiddlewares");
var user_interface_1 = require("../user/user.interface");
var validationRequest_1 = require("../../middlewares/validationRequest");
var percel_validation_1 = require("./percel.validation");
var router = (0, express_1.Router)();
router.post("/create", (0, authMiddlewares_1.checkAuth)(user_interface_1.Role.ADMIN, user_interface_1.Role.SENDER), (0, validationRequest_1.zodValidation)(percel_validation_1.createPercelZodSchema), percel_conroller_1.percelController.createPercel);
/* get all percel */
router.get("/getallpercel", (0, authMiddlewares_1.checkAuth)(user_interface_1.Role.ADMIN), percel_conroller_1.percelController.getAllPercel);
/* return percel_request_by reciever */
router.patch("/return_request", percel_conroller_1.percelController.retrunPercel);
/* Update percel*/
/* admin can update anything for percel */
/* sender can update status */
/* delivery agent is optional.I will work with it later */
router.patch("/:percelId", (0, validationRequest_1.zodValidation)(percel_validation_1.updatePercelZodSchema), (0, authMiddlewares_1.checkAuth)(user_interface_1.Role.ADMIN, user_interface_1.Role.SENDER, user_interface_1.Role.DELIVERY_AGENT), percel_conroller_1.percelController.updatePercel);
/* track percel by trackingId */
/* public,or user can track there percel by tracking id */
router.get("/track/:trackingId", percel_conroller_1.percelController.trackingPercel);
/* get percelby id */
router.get("/:percelId", (0, authMiddlewares_1.checkAuth)(user_interface_1.Role.ADMIN, user_interface_1.Role.SENDER), percel_conroller_1.percelController.getPercelById);
/* delete a percel */
router.delete("/:percelId", (0, authMiddlewares_1.checkAuth)(user_interface_1.Role.ADMIN), percel_conroller_1.percelController.deletePercel);
/* get all percel by senderInfo */
router.get("/getpercelInfo/:senderId", (0, authMiddlewares_1.checkAuth)(user_interface_1.Role.ADMIN, user_interface_1.Role.SENDER), percel_conroller_1.percelController.getPercelInfo);
/* Get incoming percel for receiver */
router.get("/getpercelinfo-receiver/:receiverId", (0, authMiddlewares_1.checkAuth)(user_interface_1.Role.RECEIVER), percel_conroller_1.percelController.getPercelInfoByReceiver);
/* Receiver get the percel and chnage the status isConfirm True */
router.patch("/confirmation/:percelId", (0, authMiddlewares_1.checkAuth)(user_interface_1.Role.RECEIVER), percel_conroller_1.percelController.setConfirmation);
exports.percelRoutes = router;
