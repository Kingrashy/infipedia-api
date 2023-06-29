import NotificationModel from "../models/Notification.js";

export const getUserNotification = async (req, res) => {
  const { userId } = req.params;
  try {
    const notification = await NotificationModel.find({ userId: userId });
    res.status(200).json(notification);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const ReadNotification = async (req, res) => {
  try {
    const { userId } = req.params;
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};
