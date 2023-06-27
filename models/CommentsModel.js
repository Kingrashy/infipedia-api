import mongoose from "mongoose";

const CommentSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    userProfile: { type: Object, required: true },
    username: { type: String, required: true },
    text: { type: String, required: true },
    likes: [],
    comments: [],
  },
  { timestamps: true }
);

const CommentsModel = mongoose.model("Comments", CommentSchema);

export default CommentsModel;
