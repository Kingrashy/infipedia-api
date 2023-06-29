import NotificationModel from "../models/Notification.js";

export const getUserNotification = async (req, res) => {
  const { userId } = req.params;
  try {
    const notification = await NotificationModel.find({ userId: userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(notification);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};
