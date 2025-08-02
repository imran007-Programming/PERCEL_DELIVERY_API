"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Allrouters = void 0;
var express_1 = require("express");
var user_routes_1 = require("../modules/user/user.routes");
var auth_route_1 = require("../modules/auth/auth.route");
var percel_route_1 = require("../modules/parcel/percel.route");
var router = (0, express_1.Router)();
var Allroutes = [
    {
        path: "/user",
        route: user_routes_1.userRoutes,
    },
    {
        path: "/user",
        route: auth_route_1.authRoutes,
    },
    {
        path: "/percel",
        route: percel_route_1.percelRoutes,
    },
];
Allroutes.forEach(function (route) { return router.use(route.path, route.route); });
exports.Allrouters = router;
