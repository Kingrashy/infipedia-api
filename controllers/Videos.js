import CommentsModel from "../models/CommentsModel.js";
import NotificationModel from "../models/Notification.js";
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

export const LikeVideo = async (req, res) => {
  try {
    const { userId, videoId } = req.body;
    const video = await VideosModel.findById(videoId);
    const user = await UserModel.findById(userId);
    const vuser = await UserModel.findById(video.userId);

    if (video.likes.includes(userId)) {
      await video.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Video unliked");
    } else if (!video.likes.includes(userId)) {
      await video.updateOne({ $push: { likes: userId } });
      const notify = new NotificationModel({
        userId: video.userId,
        message: `${user.name} liked your video`,
        isRead: false,
      });
      const newNotification = await notify.save();
      await vuser.updateOne(
        { $push: { notification: newNotification } },
        { new: true }
      );
      res.status(200).json("video liked");
    }
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const CommentsOnVideo = async (req, res) => {
  try {
    const { userId, videoId, text } = req.body;
    const video = await VideosModel.findById(videoId);
    const user = await UserModel.findById(userId);
    const vuser = await UserModel.findById(video.userId);
    const notify = new NotificationModel({
      userId: vuser._id,
      message: `${user.name} commented on your video`,
      isRead: false,
    });
    const tocomments = new CommentsModel({
      userId,
      name: user.name,
      username: user.username,
      userProfile: user.userProfile,
      text,
    });
    const newNotification = await notify.save();
    const newcomment = await tocomments.save();
    await video.updateOne({ $push: { comments: newcomment } });
    await vuser.updateOne({ $push: { notification: newNotification } });
    res.status(201).json(newcomment);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const FetchVideoComments = async (req, res) => {
  try {
    const { videoId } = req.params;
    const video = await VideosModel.findById(videoId);
    const comments = video.comments.sort((a, b) => b.createdAt - a.createdAt);
    res.status(200).json(comments);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const ViewVideo = async (req, res) => {
  try {
    const { userId, videoId } = req.body;
    const video = await VideosModel.findById(videoId);
    const updated = await video.updateOne({ $push: { views: userId } });
    res.status(200).json("video view");
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};
export const DownloadVideo = async (req, res) => {
  try {
    const { userId, videoId } = req.body;
    const video = await VideosModel.findById(videoId);
    const updated = await video.updateOne({ $push: { downloads: userId } });
    res.status(200).json("video downloaded");
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const getVideoViews = async (req, res) => {
  try {
    const { videoId } = req.params;
    const video = await VideosModel.findById(videoId);
    const views = video.views;
    res.status(200).json(views);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const getVideoLikes = async (req, res) => {
  try {
    const { videoId } = req.params;
    const video = await VideosModel.findById(videoId);
    const likes = video.likes;
    res.status(200).json(likes);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const getUsersWhoLiked = async (req, res) => {
  try {
    const { videoId } = req.params;
    const video = await VideosModel.findById(videoId);
    const likes = video.likes;

    const wholiked = await UserModel.find({ _id: { $in: likes } }).select(
      "-password -notification"
    );

    res.status(200).json(wholiked);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const getTrendingVideos = async (req, res) => {
  try {
    const videos = await VideosModel.aggregate([
      {
        $match: {
          $expr: {
            $gt: [{ $size: "$likes" }, 1], // Filter posts with at least 5 likes
          },
        },
      },
      { $addFields: { totalLikes: { $size: "$likes" } } }, // Add a field to store the total number of likes
      { $sort: { totalLikes: -1 } }, // Sort by totalLikes in descending order
      { $limit: 10 },
    ]);
    res.status(200).json(videos);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};
