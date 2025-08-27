import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Allrouters } from "./app/Allroutes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { envVars } from "./app/config/env";

const app = express();
app.use(express.json());
app.set("trust proxy", 1);
/* cookieparser */
app.use(cookieParser());

app.use(
  cors({
    origin: envVars.FRONTEND_URL,
    credentials: true,
  })
);

/* base url */
app.use("/api/v1", Allrouters);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send({
    message: "welcome to Percel_Delevery_Api",
  });
});

// /* global error handler */
app.use(globalErrorHandler);

export default app;
