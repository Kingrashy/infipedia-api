import bcrypt from "bcrypt";
import UserModel from "../models/UserModel.js";
import genAuthToken from "../utils/genAuthToken.js";

export const RegisterUser = async (req, res) => {
  try {
    const { name, email, password, username, gender } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(password, salt);
    const User = await UserModel.findOne({ email: email });
    if (User) return res.status(403).json("Email already exits");
    const UserI = await UserModel.findOne({ username: username });
    if (UserI) return res.status(403).json("Username already taken");

    const NewUser = new UserModel({
      name: name,
      email: email,
      username: username,
      gender: gender,

      password: hashedPass,
    });
    const user = await NewUser.save();
    const token = genAuthToken(user);
    res.status(201).json(token);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) return res.status(404).json("User not found");
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(403).json("Invalid password");
    const token = genAuthToken(user);
    res.status(200).json(token);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const getEmailInuse = async (req, res) => {
  try {
    const { email } = req.body;
    const emailIn = await UserModel.findOne({ email: email });
    // if (emailIn) return res.status(403).json("Email taken");
    res.status(200).json(emailIn);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};
