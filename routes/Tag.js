import express from "express";
import { TagPost, getAllTag, unTagPost } from "../controllers/Tag.js";

const router = express.Router();

router.post("/new", TagPost);
router.get("/", getAllTag);
router.delete("/:tagId", unTagPost);

export default router;
