import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Allrouters } from "./app/Allroutes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { envVars } from "./app/config/env";

const app = express();
app.use(express.json());
app.set("trust proxy", 1);
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
  res.status(200).json({         // 👈 use .json() instead of .send() for consistency
    message: "welcome to Percel_Delevery_Api",
  });
});

/* health check — keep this BEFORE globalErrorHandler */
app.get("/health", (req: Request, res: Response) => {   // 👈 add types for consistency
  res.status(200).json({ status: "ok" });
});


app.use(globalErrorHandler);

export default app;