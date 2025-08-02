import express, { Request, Response } from "express";
import cookieParser from "cookie-parser"
import cors from "cors"
import { Allrouters } from "./app/Allroutes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
const app = express();
app.use(express.json());
/* cookieparser */
app.use(cookieParser());
/* base url */
app.use("/api/v1",Allrouters)
app.use(
  cors(
  //   {
  //   origin: envVars.FRONTEND_URL,
  //   credentials: true, // ✅ allow sending cookies
  // }
)
);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send({
    message: "welcome to Percel_Delevery_Api",
  });
});

// /* global error handler */
app.use(globalErrorHandler)

export default app;
