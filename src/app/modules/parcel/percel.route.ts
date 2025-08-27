import { Router } from "express";
import { percelController } from "./percel.conroller";
import { checkAuth } from "../../middlewares/authMiddlewares";
import { Role } from "../user/user.interface";
import { zodValidation } from "../../middlewares/validationRequest";
import { createPercelZodSchema, updatePercelZodSchema } from "./percel.validation";

const router = Router();

router.post("/create",checkAuth(Role.ADMIN,Role.SENDER),zodValidation(createPercelZodSchema),percelController.createPercel);


/* get all percel */
router.get("/getallpercel",checkAuth(Role.ADMIN),percelController.getAllPercel)



/* return percel_request_by reciever */
router.patch("/return_request",percelController.retrunPercel)

/* Update percel*/
/* admin can update anything for percel */
/* sender can update status */
/* delivery agent is optional.I will work with it later */
router.patch("/:percelId",zodValidation(updatePercelZodSchema),checkAuth(Role.ADMIN,Role.SENDER,Role.DELIVERY_AGENT),percelController.updatePercel)

/* track percel by trackingId */
/* public,or user can track there percel by tracking id */
router.get("/track/:trackingId",percelController.trackingPercel)

/* get percelby id */
router.get("/:percelId",checkAuth(Role.ADMIN,Role.SENDER),percelController.getPercelById);

/* delete a percel */
router.delete("/:percelId",checkAuth(Role.ADMIN), percelController.deletePercel);

/* get all percel by senderInfo */
router.get("/getpercelInfo/:senderId",checkAuth(Role.ADMIN,Role.SENDER),percelController.getPercelInfo)

/* Get incoming percel for receiver */
router.get("/getpercelinfo-receiver/:receiverId",checkAuth(Role.RECEIVER),percelController.getPercelInfoByReceiver)

/* Receiver get the percel and chnage the status isConfirm True */
router.patch("/confirmation/:percelId",checkAuth(Role.RECEIVER),percelController.setConfirmation)

export const percelRoutes = router;
