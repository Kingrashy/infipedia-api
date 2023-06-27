import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    userProfile: { type: Object, required: true },
    body: { type: String, required: true },
    verified: { type: Boolean },
    postImg: { type: Object },
    followers: { type: Array },
    likes: { type: Array, default: [] },
    comments: { type: Array, default: [] },
  },
  { timestamps: true }
);

const PostsModel = mongoose.model("Posts", PostSchema);

export default PostsModel;
