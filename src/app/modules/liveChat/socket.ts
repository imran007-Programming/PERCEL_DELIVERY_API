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

    socket.on("user-online", async ({ userId, userName, roomId }) => {
      if (!userId) return;

      await ActiveUser.findOneAndUpdate(
        { userId },
        { userName, socketId: socket.id, roomId, lastSeen: new Date() },
        { upsert: true, new: true }
      );

      // Notify admin of current active users are online
      const users = await ActiveUser.find({});
      io?.emit("active-users", users);
    });

    // join a private room
    socket.on("join-room", async ({ roomId }) => {
      socket.join(roomId);

      // Load chat history
      const messages = await Message.find({ roomId }).sort({ time: 1 });
      socket.emit("chat-history", messages);
    });

    // indicate that user is typing
    socket.on("typing", ({ roomId, userName }) => {
      console.log(`${userName} is typing...`);
      socket.to(roomId).emit("typing", { userName });
    });

    // indicate user stopped typing
    socket.on("stop-typing", ({ roomId, userName }) => {
      console.log(`${userName} stopped typing`);
      socket.to(roomId).emit("stop-typing", { userName });
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

    try {
      /* send the Active user to the admin(dashboard)  */

      socket.on("getActiveUserForAdmin", async () => {
        const users = await ActiveUser.find({});
        socket.emit("active-users", users);
        console.log(users);
      });
    } catch (error) {
      console.log(error);
    }

    socket.on("merge-guest-to-user", async ({ guestId, userId }) => {
      // Find guest chat/messages and reassign them
      await Message.updateMany({ senderId: guestId }, { senderId: userId });
      await ActiveUser.deleteOne({ userId: guestId });
    });

    ///Remove the user if he leaved the room
    socket.on("leave-room", async ({ roomId }) => {
      console.log("user leave the room");
      socket.leave(roomId);
      await ActiveUser.findOneAndDelete({ socketId: socket.id });

      /* send updated active userlist from db to client(Admin) */
      const users = await ActiveUser.find({ roomId });
      io?.to(roomId).emit("active-users", users);
    });

    /* disconnect the socket  */
    socket.on("disconnect", async () => {
      const user = await ActiveUser.findOne({ socketId: socket.id });
      if (!user) return;

      // Wait 5 seconds before removing
      setTimeout(async () => {
        const stillOffline = await ActiveUser.findOne({ userId: user.userId });
        if (stillOffline && stillOffline.socketId === socket.id) {
          await ActiveUser.findOneAndDelete({ userId: user.userId });
        }
      }, 5000);
    });
  });
  return io;
}
