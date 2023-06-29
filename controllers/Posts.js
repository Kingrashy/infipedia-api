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
  const { postId, userId, text } = req.body;
  const posts = await PostsModel.findById(postId);
  const user = await UserModel.findById(userId);
  const pId = posts.userId;
  const postUser = await UserModel.findById(pId);
  const notify = new NotificationModel({
    userId: userId,
    message: `${user.name} liked your post`,
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
  await postUser.updateOne({ $push: { notification: newNotification } });
  await posts.updateOne({ $push: { comments: newComment } }, { new: true });
  res.status(201).json(newComment);
  try {
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
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
        userId: userId,
        message: `${likedUser.name} liked your post`,
        isRead: false,
      });
      const newNotification = notify.save();
      await user.updateOne({ $push: { notification: newNotification } });

      res.status(200).json("Post liked");
    }
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const findUserliked = async (req, res) => {
  try {
    const { postId, userId } = req.body;
    const posts = await PostsModel.findById(postId);
    const liked = posts.likes.includes(userId);
    res.status(200).json(liked);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const findAllUserLiked = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await PostsModel.find();

    const liked = posts?.likes?.find((id) => id);
    const likedpost = await PostsModel.find({ userId: { $all: [userId] } });
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
