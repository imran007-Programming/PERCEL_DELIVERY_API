import { Server } from "socket.io";
import { ActiveUser } from "./ActiveUserSchema";
import { Message } from "./ChatSchema";

let io: Server | undefined;

import { Server as HttpServer } from "http";

export function socketInit(server: HttpServer) {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST"],
    },
  });
  // connect the socekt io
  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    // join a private room
    socket.on("join-room", async ({ roomId, userName }) => {
      socket.join(roomId);
      

      ///save the active user in db
      if (roomId && userName) {
        await ActiveUser.findOneAndUpdate(
          { roomId, userName },
          { socketId: socket.id, lastSeen: new Date() },
          { upsert: true }
        );
      }

      //send updated active users list from db
      const users = await ActiveUser.find({});
        console.log(users)
      io?.emit("active-users", users);

      ///Load chat history
      const message = await Message.find({ roomId }).sort({ time: 1 });
      //   console.log(message);
      socket.emit("chat-history", message);
    });

    // indicate that user is typing
    socket.on("typing", ({ roomId, userName }) => {
      console.log(`${userName} is typing...`);
      socket.to(roomId).emit("typing", { userName }); // ✅ emit object
    });

    // indicate user stopped typing
    socket.on("stop-typing", ({ roomId, userName }) => {
      console.log(`${userName} stopped typing`);
      socket.to(roomId).emit("stop-typing", { userName }); // ✅ emit object
    });

    // handle message//
    socket.on("message", async ({ roomId, user, text }) => {
      const messageData = { roomId, user, text, time: new Date() };
    
      // 1️⃣ Instantly broadcast to all users (including sender)
      io?.to(roomId).emit("message", messageData);

      // 2️⃣ Then save in background (no blocking)
      try {
        const message = new Message(messageData);
        await message.save();
      } catch (error) {
        console.error("Failed to save message:", error);
      }
    });

    /* send the Active user to the admin(dashboard)  */

    socket.on("getActiveUserForAdmin", async () => {
      const users = await ActiveUser.find({});
      socket.emit("active-users", users);
    });

    ///Remove the user if he leaved the room
    socket.on("leave-room", async ({ roomId }) => {
      socket.leave(roomId);
      await ActiveUser.findOneAndDelete({ socketId: socket.id });

      /* send updated active userlist from db to client(Admin) */
      const users = await ActiveUser.find({ roomId });
      io?.to(roomId).emit("active-users", users);
    });

    /* disconnect the socket  */
    socket.on("disconnect", async (reason) => {
      await ActiveUser.findOneAndDelete({ socketId: socket.id });
      const users = await ActiveUser.find({});
      io?.emit("active-users", users);
      console.log("User Disconnected", socket.id, "resone:", reason);
    });
  });
  return io;
}
