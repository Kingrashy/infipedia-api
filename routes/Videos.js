import express from "express";
import {
  CommentsOnVideo,
  FetchVideoComments,
  GetAllVideos,
  LikeVideo,
  PostVideo,
  getSingleVideo,
  getUserVideos,
} from "../controllers/Videos.js";

const router = express.Router();

router.get("/", GetAllVideos);
router.post("/new", PostVideo);
router.get("/:playId", getSingleVideo);
router.get("/:username/get", getUserVideos);
router.patch("/like/", LikeVideo);
router.patch("/comments", CommentsOnVideo);
router.get("/comments/all/:videoId", FetchVideoComments);

export default router;
