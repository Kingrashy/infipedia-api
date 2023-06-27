import mongoose from "mongoose";

const AdvertSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    adImg: { type: Object, required: true },
    adBody: { type: String, required: true },
    adUrl: { type, String, required: true },
  },
  { timestamps: true }
);
const AdvertModel = mongoose.model("Advert", AdvertSchema);

export default AdvertModel;
