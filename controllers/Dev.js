import UserModel from "../models/UserModel.js";

export const VerifyUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.verified = !user.verified;
    await user.save();

    if (user.verified) {
      res.status(200).json("User verified");
    } else {
      res.status(200).json("User unverified");
    }
  } catch (error) {
    console.log({ error: error.message });
    return res.status(500).json({ error: error.message });
  }
};

export const DisableUserAccount = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.disabled = !user.disabled;
    await user.save();

    if (user.disabled) {
      res.status(200).json("Account disabled");
    } else {
      res.status(200).json("Account reviwed");
    }
  } catch (error) {
    console.log({ error: error.message });
    return res.status(500).json({ error: error.message });
  }
};

export const DeleteUserAccount = async (req, res) => {
  try {
    const { userId } = re.params;
    const user = await UserModel.findByIdAndDelete(userId);
    res.status(200).json(user);
  } catch (error) {
    console.log({ error: error.message });
    return res.status(500).json({ error: error.message });
  }
};
