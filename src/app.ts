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

// ✅ Move these BEFORE Allrouters so nothing can intercept them
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "welcome to Percel_Delevery_Api",
  });
});

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

/* base url — AFTER health routes */
app.use("/api/v1", Allrouters);

app.use(globalErrorHandler);

export default app;