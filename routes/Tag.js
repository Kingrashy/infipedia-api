import express from "express";
import {
  TagPost,
  getAllTag,
  getUserTagged,
  unTagPost,
} from "../controllers/Tag.js";

const router = express.Router();

router.post("/new", TagPost);
router.get("/", getAllTag);
router.get("/:userId/all", getUserTagged);
router.delete("/:tagId", unTagPost);

export default router;
