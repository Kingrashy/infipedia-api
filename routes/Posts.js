import express from "express";
import {
  Comments,
  CreatePost,
  deletePost,
  findAllUserLiked,
  findUserliked,
  getAllPosts,
  getFollowingPost,
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
router.get("/like/find", findUserliked);
router.get("/likes/find/:userId", findAllUserLiked);
router.get("/following/:userId", getFollowingPost);

export default router;
