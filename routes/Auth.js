import express from "express";
import { RegisterUser, getEmailInuse, loginUser } from "../controllers/Auth.js";

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", loginUser);
router.get("/email", getEmailInuse);

export default router;
