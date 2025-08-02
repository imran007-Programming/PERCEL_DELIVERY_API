
import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import { authRoutes } from "../modules/auth/auth.route";
import { percelRoutes } from "../modules/parcel/percel.route";


const router = Router();

const Allroutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/user",
    route: authRoutes,
  },
  {
    path: "/percel",
    route: percelRoutes,
  },
];

Allroutes.forEach((route) => router.use(route.path, route.route));
export const Allrouters = router;
