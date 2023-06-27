import express from "express";
import { createMessage, getMessage } from "../controllers/Message.js";

const router = express.Router();

router.post("/new", createMessage);
router.get("/:chatId", getMessage);

export default router;
