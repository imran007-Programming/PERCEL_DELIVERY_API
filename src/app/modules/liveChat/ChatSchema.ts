import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
  roomId: { type: String, required: true },
  user: { type: String, required: true },
  text: { type: String, required: true },
  time: { type: Date, default: Date.now },
});

export const Message=mongoose.model("Message",messageSchema)
