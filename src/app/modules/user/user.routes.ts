import { zodValidation } from './../../middlewares/validationRequest';
import { Router } from "express";
import { userControllers } from "./user.controller";
import { updateUserZodSchema, userZodSchema } from './user.validation';
import { checkAuth } from '../../middlewares/authMiddlewares';
import { Role } from './user.interface';


const router = Router();

router.post("/register",zodValidation(userZodSchema),userControllers.createUser);
/* get all user */
router.get("/allusers",checkAuth(Role.ADMIN),userControllers.getAllusers);

/* get me */
router.get("/me", checkAuth(...Object.values(Role)), userControllers.getMe)

/* delete a user */
router.delete("/delete/:userId",checkAuth(Role.ADMIN),userControllers.deleteUser);
/* update a user */
router.patch("/update/:userId",zodValidation(updateUserZodSchema),checkAuth(...Object.values(Role)),userControllers.updateUser);
/* block a user  */
router.patch("/block/:userId",checkAuth(Role.ADMIN),userControllers.blockUser)
/* Unblock a user  */
router.patch("/unblock/:userId",checkAuth(Role.ADMIN),userControllers.unblockUser)


export const userRoutes = router;
