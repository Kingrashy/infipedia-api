import mongoose from "mongoose";

const CommunitySchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    owner: { type: Array },
    cname: { type: String, required: true },
    cdesc: { type: String, required: true },
    slug: { type: String, required: true },
    cprofile: { type: Object, required: true },
    ccover: { type: Object },
    members: { type: Array, default: [] },
    verified: { type: Boolean, default: false },
    post: { type: Array },
    annoucement: { type: Array },
  },
  { timestamps: true }
);

const CommunityModel = mongoose.model("Community", CommunitySchema);

export default CommunityModel;
