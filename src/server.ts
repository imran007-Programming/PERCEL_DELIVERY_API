// import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import { envVars } from "./app/config/env";
import { Server } from "http";


let server:Server;

const startServer=async()=>{
try {
    await mongoose.connect(envVars.DB_URL)
    console.log('connected to db!')
   server= app.listen(envVars.PORT,()=>{
        console.log(`SERVER is running at port ${envVars.PORT}`)
    })
} catch (error) {
    console.log(error)
}
}

startServer()

/* Handle rejection error */
process.on("unhandledRejection", (err) => {
  console.log("unhandle Rejection detected .... server shuting down",err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1)

});



/* Uncaught rejection error */
process.on("uncaughtException",()=>{
  console.log("Uncaught Exception detected... Server shutting error")
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1)
})
;


/* Singnal termination sigtem */
process.on("SIGTERM",()=>{
  console.log("SIGTERM signal recieved... Server shutting error")
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1)
});

process.on("SIGINT",()=>{
  console.log("SIGINT signal recieved... Server shutting error")
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1)
})
