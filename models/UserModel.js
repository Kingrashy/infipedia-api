import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    userProfile: { type: Object },
    userCover: { type: Object },
    followers: { type: Array, default: [] },
    following: { type: Array, default: [] },
    location: String,
    bio: String,
    verified: { type: Boolean, default: false },
    notification: { type: Array },
  },
  { timestamps: true }
);
const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
