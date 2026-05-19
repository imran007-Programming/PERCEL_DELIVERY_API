import app from "./app";
import mongoose from "mongoose";
import { envVars } from "./app/config/env";
import { Server } from "http";
import http from "http";
import { socketInit } from "./app/modules/liveChat/socket";
import axios from "axios";

let server: Server;
let keepAliveInterval: ReturnType<typeof setInterval>;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);
    console.log("connected to db!");

    const httpServer = http.createServer(app);
    socketInit(httpServer);

    server = httpServer.listen(envVars.PORT, () => {
      console.log(`SERVER is running at port ${envVars.PORT}`);

      keepAliveInterval = setInterval(() => {
        axios
          .get("https://percel-delivery-api-1.onrender.com/health", {
            validateStatus: (status) => status < 500, // treats 404 as OK
          })
          .then((res) =>
            console.log(`Keep-alive ping sent — status: ${res.status}`)
          )
          .catch((err) =>
            console.error(`Keep-alive failed: ${err.message}`)
          );
      }, 780000);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

const shutdown = (signal: string) => {
  console.log(`${signal} received... shutting down`);
  clearInterval(keepAliveInterval);
  if (server) {
    server.close(() => process.exit(0));
  } else {
    process.exit(0);
  }
};

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection detected:", err);
  shutdown("unhandledRejection");
});

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception detected:", err);
  shutdown("uncaughtException");
});

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));