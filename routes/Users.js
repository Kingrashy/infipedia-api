import express from "express";
import {
  EditUser,
  EditUserCover,
  EditUserProfile,
  addRemoveFriend,
  deleteUserAccount,
  getAllUsers,
  getPopularUser,
  getSearchedUsers,
  getSingleUser,
  getUserById,
  getUserFollowers,
  getUserFollowing,
} from "../controllers/Users.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:username", getSingleUser);
router.get("/:userId/get", getUserById);
router.get("/followers/:userId", getUserFollowers);
router.get("/following/:userId", getUserFollowing);
router.get("/trending/all", getPopularUser);
router.patch("/:id/edit", EditUser);
router.patch("/edit/profile", EditUserProfile);
router.patch("/edit/cover", EditUserCover);
router.patch("/follow/:followId", addRemoveFriend);
router.delete("/delete/:userId", deleteUserAccount);
router.get("/all/:searchTerm", getSearchedUsers);

export default router;
