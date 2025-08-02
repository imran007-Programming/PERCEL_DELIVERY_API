import { zodValidation } from './../../middlewares/validationRequest';
import { Router } from "express";
import { userControllers } from "./user.controller";
import { updateUserZodSchema, userZodSchema } from './user.validation';
import { checkAuth } from '../../middlewares/authMiddlewares';
import { Role } from './user.interface';


const route = Router();

route.post("/register",zodValidation(userZodSchema),userControllers.createUser);
/* get all user */
route.get("/allusers",checkAuth(Role.ADMIN),userControllers.getAllusers);
/* delete a user */
route.delete("/delete/:userId",checkAuth(Role.ADMIN),userControllers.deleteUser);
/* update a user */
route.patch("/update/:userId",zodValidation(updateUserZodSchema),checkAuth(...Object.values(Role)),userControllers.updateUser);
/* block a user  */
route.patch("/block/:userId",checkAuth(Role.ADMIN),userControllers.blockUser)
/* Unblock a user  */
route.patch("/unblock/:userId",checkAuth(Role.ADMIN),userControllers.unblockUser)


export const userRoutes = route;
