import express from "express";
import {
  addRules,
  createCommunity,
  getAllCommunity,
  getSingleCommunity,
} from "../controllers/Community.js";

const router = express.Router();

router.get("/", getAllCommunity);
router.get("/:id", getSingleCommunity);
router.post("/new", createCommunity);
router.patch("/:communityId/rules", addRules);

export default router;
