import express from "express";
import {
  ReadNotification,
  getUserNotification,
  getUserUnread,
} from "../controllers/Notification.js";

const router = express.Router();

router.get("/:userId", getUserNotification);
router.patch("/:userId/updated", ReadNotification);
router.get("/get/:username", getUserUnread);

export default router;
