"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors_1 = __importDefault(require("cors"));
var Allroutes_1 = require("./app/Allroutes");
var globalErrorHandler_1 = require("./app/middlewares/globalErrorHandler");
var app = (0, express_1.default)();
app.use(express_1.default.json());
/* cookieparser */
app.use((0, cookie_parser_1.default)());
/* base url */
app.use("/api/v1", Allroutes_1.Allrouters);
app.use((0, cors_1.default)(
//   {
//   origin: envVars.FRONTEND_URL,
//   credentials: true, // ✅ allow sending cookies
// }
));
app.get("/", function (req, res) {
    res.status(200).send({
        message: "welcome to Percel_Delevery_Api",
    });
});
// /* global error handler */
app.use(globalErrorHandler_1.globalErrorHandler);
exports.default = app;
