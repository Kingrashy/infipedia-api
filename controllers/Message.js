import MessageModel from "../models/MessageModel.js";
import cloudinary from "../utils/cloudinary.js";

export const createMessage = async (req, res) => {
  const { chatId, senderId, text, textImg, url } = req.body;
  try {
    if (textImg) {
      const uploadRes = await cloudinary.uploader.upload(textImg, {
        upload_preset: "messages_image",
      });
      if (uploadRes) {
        const message = new MessageModel({
          chatId: chatId,
          senderId: senderId,
          text: text,
          url: url,
          textImg: uploadRes,
        });
        const newmessage = await message.save();
        res.status(201).json(newmessage);
      }
    } else if (!textImg) {
      const message = new MessageModel({
        chatId: chatId,
        senderId: senderId,
        text: text,
        url: url,
      });
      const newmessage = await message.save();
      res.status(201).json(newmessage);
    }
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const getMessage = async (req, res) => {
  const { chatId } = req.params;
  try {
    const message = await MessageModel.find({ chatId });
    res.status(200).json(message);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};
