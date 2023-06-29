import mongoose from "mongoose";

const NotificationSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    message: String,
    isRead: { type: Boolean },
  },
  { timestamps: true }
);
const NotificationModel = mongoose.model("Notifications", NotificationSchema);

export default NotificationModel;
