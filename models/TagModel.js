import mongoose from "mongoose";

const TagSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    userProfile: { type: Object },
    postprofile: { type: Object },
    verified: { type: Boolean },
    postmade: { type: String },
    postId: { type: String, required: true },
    postname: { type: String, required: true },
    postverified: { type: Boolean },
    body: { type: String, required: true },
    postImg: { type: Object },
    likes: { type: Array, default: [] },
    comments: { type: Array, default: [] },
  },
  { timestamps: true }
);
const TagModel = mongoose.model("Tag Posts", TagSchema);
export default TagModel;
