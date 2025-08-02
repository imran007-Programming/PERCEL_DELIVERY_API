import { Router } from "express";
import { authController } from "./auth.controller";
import { Role } from "../user/user.interface";
import { checkAuth } from "../../middlewares/authMiddlewares";

const router = Router();
/* login route */
router.post("/login", authController.loginUser);
/* create a accessToken from a refreshToken Route */

router.post("/refresh-token",authController.getNewAccessToken)
/* logout route */
router.post("/logout",authController.logout)
/* reset password */
router.post(
  "/reset-password",
  checkAuth(...Object.values(Role)),
  authController.resetPassword
);

export const authRoutes = router;
