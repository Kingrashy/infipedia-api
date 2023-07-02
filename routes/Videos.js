import express from "express";
import {
  CommentsOnVideo,
  DownloadVideo,
  FetchVideoComments,
  GetAllVideos,
  LikeVideo,
  PostVideo,
  ViewVideo,
  getSingleVideo,
  getUserVideos,
  getVideoLikes,
  getVideoViews,
} from "../controllers/Videos.js";

const router = express.Router();

router.get("/", GetAllVideos);
router.post("/new", PostVideo);
router.get("/:playId", getSingleVideo);
router.get("/:username/get", getUserVideos);
router.patch("/like/", LikeVideo);
router.patch("/comments", CommentsOnVideo);
router.patch("/view/one", ViewVideo);
router.patch("/download/one", DownloadVideo);
router.get("/comments/all/:videoId", FetchVideoComments);
router.get("/views/all/:videoId", getVideoViews);
router.get("/likes/all/:videoId", getVideoLikes);

export default router;
