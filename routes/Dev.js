import express from "express";
import {
  DeleteUserAccount,
  DisableUserAccount,
  VerifyUser,
} from "../controllers/Dev.js";

const router = express.Router();

router.patch("/verify/:userId", VerifyUser);
router.patch("/disable/:userId", DisableUserAccount);
router.delete("/delete/:userId", DeleteUserAccount);

export default router;
