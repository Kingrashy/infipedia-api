import NotificationModel from "../models/Notification.js";
import UserModel from "../models/UserModel.js";
import cloudinary from "../utils/cloudinary.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await UserModel.findOne({ username: username });
    if (!user) return res.status(404).json("User doest not exits");
    res.status(200).json(user);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await UserModel.findById(userId);
    delete user.password;
    res.status(200).json(user);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const EditUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (id === userId) {
      const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      res.status(200).json(updatedUser);
    } else {
      return res.status(404).json({ msg: "Access denied" });
    }
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const EditUserProfile = async (req, res) => {
  try {
    const { userId, userProfile } = req.body;
    if (userProfile) {
      const uploadRes = await cloudinary.uploader.upload(userProfile, {
        upload_preset: "infipedia_profiles",
      });
      if (uploadRes) {
        const newUpadte = {
          userProfile: uploadRes,
        };
        const updatedUser = await UserModel.findByIdAndUpdate(
          userId,
          newUpadte,
          { new: true }
        );
        res.status(200).json(updatedUser);
      }
    } else return res.status(403).json("Photo is required");
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const EditUserCover = async (req, res) => {
  try {
    const { userId, userCover } = req.body;
    if (userCover) {
      const uploadRes = await cloudinary.uploader.upload(userCover, {
        upload_preset: "infipedia_profiles",
      });
      if (uploadRes) {
        const newUpadte = {
          userProfile: uploadRes,
        };

        const updatedUser = await UserModel.findByIdAndUpdate(
          userId,
          newUpadte,
          { new: true }
        );
        res.status(200).json(updatedUser);
      }
    } else return res.status(403).json("Cover photo is required");
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const addRemoveFriend = async (req, res) => {
  try {
    const { followId } = req.params;
    const { userId } = req.body;

    if (followId === userId) {
      return res.status(403).json("Action Forbidden");
    } else {
      try {
        const followUser = await UserModel.findById(followId);
        const followingUser = await UserModel.findById(userId);

        if (!followUser.followers.includes(userId)) {
          await followUser.updateOne({ $push: { followers: userId } });
          await followingUser.updateOne({ $push: { following: followId } });
          const notify = new NotificationModel({
            userId: followId,
            message: `${followingUser.name} followed you`,
            isRead: false,
          });
          const newNotification = notify.save();
          await followUser.updateOne({
            $push: { notification: newNotification },
          });

          res.status(200).json("User Followed");
        } else {
          await followUser.updateOne({ $pull: { followers: userId } });
          await followingUser.updateOne({ $pull: { following: followId } });

          res.status(200).json("User Unfollowed");
        }
      } catch (error) {
        console.log({ error: error.message });
        res.status(500).json({ error: error.message });
      }
    }
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const getUserFollowers = async (req, res) => {
  try {
    const { userId } = req.params;
    const User = await UserModel.findById(userId);
    const followers = User?.followers?.filter((id) => id);
    const users = await UserModel.find({ _id: { $in: followers } });
    const usersWithoutPasswords = users.map((user) => {
      user.password = undefined;
      return user;
    });
    res.status(200).json(usersWithoutPasswords);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const getUserFollowing = async (req, res) => {
  try {
    const { userId } = req.params;
    const User = await UserModel.findById(userId);
    const following = User?.following?.filter((id) => id);
    const users = await UserModel.find({ _id: { $in: following } });

    const usersWithoutPasswords = users.map((user) => {
      user.password = undefined;
      return user;
    });
    res.status(200).json(usersWithoutPasswords);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const deleteUserAccount = async (req, res) => {
  try {
    const { userId } = req.params;
    const User = await UserModel.findByIdAndDelete(userId);
    res.status(200).json(User);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const getPopularUser = async (req, res) => {
  try {
    const users = await UserModel.find().sort({ followers: -1 }).limit(3);
    res.status(200).json(users);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};
