import express from "express";
import { getUserNotification } from "../controllers/Notification.js";

const router = express.Router();

router.get("/:userId", getUserNotification);

export default router;
