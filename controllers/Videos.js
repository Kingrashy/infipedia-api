import UserModel from "../models/UserModel.js";
import VideosModel from "../models/VideosModel.js";
import cloudinary from "../utils/cloudinary.js";

export const GetAllVideos = async (req, res) => {
  try {
    const video = await VideosModel.find().sort({ createdAt: -1 });
    res.status(200).json(video);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const PostVideo = async (req, res) => {
  try {
    const { userId, desc, video } = req.body;
    const User = await UserModel.findById(userId);

    if (video) {
      const UploadRes = await cloudinary.uploader.upload_large(video, {
        resource_type: "video",
        chunk_size: 6000000,
        upload_preset: "Infipedia_videos",
      });

      if (UploadRes) {
        const Video = new VideosModel({
          userId,
          username: User.username,
          name: User.name,
          userProfile: User.userProfile,
          desc: desc,
          video: UploadRes,
          verified: User.verified,
        });
        const newvideo = await Video.save();
        res.status(201).json(newvideo);
      } else return res.status(403).json("video file required");
    }
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const getSingleVideo = async (req, res) => {
  try {
    const { playId } = req.params;
    const video = await VideosModel.findById(playId);
    res.status(200).json(video);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const getUserVideos = async (req, res) => {
  try {
    const { username } = req.params;
    const video = await VideosModel.find({ username: username }).sort({
      createdAt: -1,
    });
    res.status(200).json(video);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};
