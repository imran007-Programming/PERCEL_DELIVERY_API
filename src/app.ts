import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Allrouters } from "./app/Allroutes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { envVars } from "./app/config/env";
import axios from "axios";
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

const url = `https://percel-delivery-api-bpht.onrender.com`;
const interval = 30000;

function reloadWebsite() {
  axios
    .get(url)
    .then((response) => {
      console.log("website reloded");
    })
    .catch((error) => {
      console.error(`Error : ${error.message}`);
    });
}

setInterval(reloadWebsite, interval);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send({
    message: "welcome to Percel_Delevery_Api",
  });
});

// /* global error handler */
app.use(globalErrorHandler);

export default app;
