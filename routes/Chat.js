import express from "express";
import { createChat, findChat, findUserChat } from "../controllers/Chat.js";

const router = express.Router();

router.post("/", createChat);
router.get("/find", findChat);
router.get("/find/all/:userId", findUserChat);

export default router;
