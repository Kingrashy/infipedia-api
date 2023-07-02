import mongoose from "mongoose";

const VideosSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    username: { type: String, required: true },
    name: { type: String, required: true },
    userProfile: { type: Object, required: true },
    video: { type: Object, required: true },
    verified: { type: Boolean },
    desc: { type: String, required: true },
    likes: { type: Array, default: [] },
    comments: { type: Array, default: [] },
    downloads: { type: Array, default: [] },
    views: { type: Array, default: [] },
  },
  { timestamps: true }
);

const VideosModel = mongoose.model("Videos", VideosSchema);

export default VideosModel;
