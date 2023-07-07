import express from "express";
import {
  createCommunity,
  getAllCommunity,
  getSingleCommunity,
} from "../controllers/Community.js";

const router = express.Router();

router.get("/", getAllCommunity);
router.get("/one/:slug", getSingleCommunity);
router.post("/new", createCommunity);

export default router;
