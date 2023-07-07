import RequestModel from "../models/RequestModal";
import UserModel from "../models/UserModel";

export const SubmitVerificationRequest = async (req, res) => {
  try {
    const { userId, desc, reason, requestType } = req.body;
    const user = await UserModel.findById(userId);

    const request = new RequestModel({
      userId,
      name: user.name,
      userProfile: user.userProfile,
      desc: desc,
      reason: reason,
      requestType: requestType,
      status: "pending",
    });
    const newrequest = await request.save();
    res.status(201).json(newrequest);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const getRequest = async (req, res) => {
  try {
    const { requestId } = req.body;
    const request = await RequestModel.findById(requestId);
    res.status(200).json(request);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};
