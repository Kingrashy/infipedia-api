import PostsModel from "../models/PostModel.js";
import UserModel from "../models/UserModel.js";
import cloudinary from "../utils/cloudinary.js";
import CommentsModel from "../models/CommentsModel.js";
import NotificationModel from "../models/Notification.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostsModel.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const CreatePost = async (req, res) => {
  try {
    const { body, userId, postImg } = req.body;
    const User = await UserModel.findById(userId);

    if (postImg) {
      const uploadRes = await cloudinary.uploader.upload(postImg, {
        upload_preset: "infipedia_posts",
      });

      const newPost = new PostsModel({
        userId,
        body: body,
        likes: [],
        comment: [],
        username: User.username,
        name: User.name,
        verified: User.verified,
        userProfile: User.userProfile,
        postImg: uploadRes,
      });
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } else if (!postImg) {
      const newPost = new PostsModel({
        userId,
        body: body,
        likes: [],
        comment: [],
        username: User.username,
        name: User.name,
        verified: User.verified,
        userProfile: User.userProfile,
      });
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    }
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const Comments = async (req, res) => {
  const { postId, userId, text, commentsImg } = req.body;

  if (commentsImg) {
    const UploadRes = await cloudinary.uploader.upload(commentsImg, {
      upload_preset: "infipedia_comments",
    });

    const posts = await PostsModel.findById(postId);
    const user = await UserModel.findById(userId);
    const pId = posts.userId;
    const postUser = await UserModel.findById(pId);
    const notify = new NotificationModel({
      userId: pId,
      message: `${user.name} commented on your post`,
      isRead: false,
    });
    const newNotification = notify.save();
    const tocomments = new CommentsModel({
      userId,
      name: user.name,
      username: user.username,
      userProfile: user.userProfile,
      text,
      commentsImg: UploadRes,
    });
    const newComment = await tocomments.save();
    await postUser.updateOne(
      { $push: { notification: notify } },
      { new: true }
    );
    await posts.updateOne({ $push: { comments: newComment } }, { new: true });
    res.status(201).json(newComment);
    try {
    } catch (error) {
      console.log({ error: error.message });
      res.status(500).json({ error: error.message });
    }
  } else if (!commentsImg) {
    const posts = await PostsModel.findById(postId);
    const user = await UserModel.findById(userId);
    const pId = posts.userId;
    const postUser = await UserModel.findById(pId);
    const notify = new NotificationModel({
      userId: pId,
      message: `${user.name} commented on your post`,
      isRead: false,
    });
    const newNotification = notify.save();
    const tocomments = new CommentsModel({
      userId,
      name: user.name,
      username: user.username,
      userProfile: user.userProfile,
      text,
    });
    const newComment = await tocomments.save();
    await postUser.updateOne(
      { $push: { notification: notify } },
      { new: true }
    );
    await posts.updateOne({ $push: { comments: newComment } }, { new: true });
    res.status(201).json(newComment);
    try {
    } catch (error) {
      console.log({ error: error.message });
      res.status(500).json({ error: error.message });
    }
  }
};

export const likeComments = async (req, res) => {
  try {
    const { commentId, userId, postId } = req.body;
    // const posts = await PostsModel.findById(post)
    const comments = await CommentsModel.findById(commentId);
    if (comments.likes.includes(userId)) {
      await comments.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Unliked Comments");
    } else {
      await comments.updateOne({ $push: { likes: userId } });
      res.status(200).json("Liked Comments");
    }
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    const posts = await PostsModel.findById(postId);
    const user = await UserModel.findById(posts.userId);
    const likedUser = await UserModel.findById(userId);

    if (posts.likes.includes(userId)) {
      await posts.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post unliked");
    } else {
      await posts.updateOne({ $push: { likes: userId } });
      const notify = new NotificationModel({
        userId: posts.userId,
        message: `${likedUser.name} liked your post`,
        isRead: false,
      });
      const newNotification = notify.save();
      await user.updateOne({ $push: { notification: notify } }, { new: true });

      res.status(200).json("Post liked");
    }
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const findAllUserLiked = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await PostsModel.find();
    const likedpost = await posts.findMany({ likes: { $all: [userId] } });
    res.status(200).json(likedpost);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const getUserPost = async (req, res) => {
  try {
    const { username } = req.params;
    const post = await PostsModel.find({ username: username }).sort({
      createdAt: -1,
    });
    res.status(200).json(post);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const post = await PostsModel.findById(postId);
    if (post.postImg?.public_id) {
      const destroyRes = await cloudinary.uploader.destroy(
        post.postImg.public_id
      );
      if (destroyRes) {
        const updatedPosts = await PostsModel.findByIdAndDelete(postId);
        res.status(200).json(updatedPosts);
      }
    } else if (!post.postImg?.public_id) {
      const post = await PostsModel.findByIdAndDelete(postId);
      res.status(200).json(post);
    }
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const getFollowingPost = async (req, res) => {
  try {
    const { userId } = req.params;
    const User = await UserModel.findById(userId);
    const followingId = User.following.filter((id) => id);
    const Post = await PostsModel.find({
      userId: { $in: followingId },
    }).sort({ createdAt: -1 });
    res.status(200).json(Post);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const getTrendingPost = async (req, res) => {
  try {
    // const posts = await PostsModel.aggregate([
    //   { $sort: { likes: -1 } },
    //   { $limit: 10 },
    // ]);
    const posts = await PostsModel.aggregate([
      {
        $match: {
          $expr: {
            $gt: [{ $size: "$likes" }, 4], // Filter posts with at least 5 likes
          },
        },
      },
      { $addFields: { totalLikes: { $size: "$likes" } } }, // Add a field to store the total number of likes
      { $sort: { totalLikes: -1 } }, // Sort by totalLikes in descending order
      { $limit: 10 },
    ]);
    res.status(200).json(posts);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const getStatusPost = async (req, res) => {
  const { username, postId } = req.params;

  try {
    const posts = await PostsModel.findOne({ username: username, _id: postId });
    if (!posts) return res.status(404).json("Post not found");
    res.status(200).json(posts);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const FetchPostLikes = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await PostsModel.findById(postId);
    const plikes = post.likes;
    res.status(200).json(plikes);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const FetchPostComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await PostsModel.findById(postId);
    const pcomments = post.comments;
    res.status(200).json(pcomments);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};
