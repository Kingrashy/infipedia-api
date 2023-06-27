import mongoose from "mongoose";

const MessageSchema = mongoose.Schema(
  {
    chatId: { type: String, required: true },
    senderId: { type: String, required: true },
    textImg: { type: Object },
    text: { type: String },
    url: { type: String },
  },
  { timestamps: true }
);
const MessageModel = mongoose.model("Messages", MessageSchema);

export default MessageModel;
