import express from "express";
import {
  ReadNotification,
  getUserNotification,
} from "../controllers/Notification.js";

const router = express.Router();

router.get("/:userId", getUserNotification);
router.patch("/:userId/updated", ReadNotification);

export default router;
