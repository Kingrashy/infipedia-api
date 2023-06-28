import PostsModel from "../models/PostModel.js";
import TagModel from "../models/TagModel.js";
import UserModel from "../models/UserModel.js";

export const TagPost = async (req, res) => {
  const { postId, userId } = req.body;

  try {
    const post = await PostsModel.findById(postId);
    const user = await UserModel.findById(userId);

    const tag = new TagModel({
      userId,
      postId,
      name: user.name,
      userProfile: user.userProfile,
      verified: user.verified,
      postname: post.name,
      postverified: post.verified,
      body: post.body,
      postImg: post.postImg,
      postprofile: post.userProfile,
      postmade: post.createdAt,
    });
    const newTag = await tag.save();
    res.status(201).json(newTag);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const getAllTag = async (req, res) => {
  try {
    const tag = await TagModel.find().sort({ createdAt: -1 });
    res.status(200).json(tag);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const unTagPost = async (req, res) => {
  try {
    const { tagId } = req.params;
    const tag = await TagModel.findByIdAndDelete(tagId);
    res.status(200).json(tag);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const getUserTagged = async (req, res) => {
  try {
    const { userId } = req.params;
    const tagged = await TagModel.find({ userId: userId });
    res.status(200).json(tagged);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};
