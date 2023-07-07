import mongoose from "mongoose";

const RequestSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    userProfile: { type: Object },
    requestType: { type: String, required: true },
    desc: { type: String, required: true },
    status: null,
    reason: { type: String, required: true },
  },
  { timestamp: true }
);

const RequestModel = mongoose.model("Request", RequestSchema);

export default RequestModel;
