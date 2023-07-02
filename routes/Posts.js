import express from "express";
import {
  Comments,
  CreatePost,
  FetchPostComments,
  FetchPostLikes,
  deletePost,
  findAllUserLiked,
  getAllPosts,
  getFollowingPost,
  getStatusPost,
  getTrendingPost,
  getUserPost,
  likeComments,
  likePost,
} from "../controllers/Posts.js";

const router = express.Router();

router.get("/", getAllPosts);
router.post("/new", CreatePost);
router.get("/:username", getUserPost);
router.patch("/comment", Comments);
router.patch("/comment/like", likeComments);
router.patch("/like", likePost);
router.patch("/delete", deletePost);
router.get("/likes/find/:userId", findAllUserLiked);
router.get("/following/:userId", getFollowingPost);
router.get("/trend/all", getTrendingPost);
router.get("/:username/status/:postId", getStatusPost);
router.get("/likes/all/:postId", FetchPostLikes);
router.get("/comments/all/:postId", FetchPostComments);

export default router;
