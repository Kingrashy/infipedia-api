import express from "express";
import {
  GetAllVideos,
  PostVideo,
  getSingleVideo,
  getUserVideos,
} from "../controllers/Videos.js";

const router = express.Router();

router.get("/", GetAllVideos);
router.post("/new", PostVideo);
router.get("/:playId", getSingleVideo);
router.get("/:username/get", getUserVideos);

export default router;
