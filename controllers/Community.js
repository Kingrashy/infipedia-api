import { v4 as uuid } from "uuid";
import UserModel from "../models/UserModel.js";
import { communitydata } from "../community.js";
import CommunityModel from "../models/CommunityModel.js";

export const getAllCommunity = async (req, res) => {
  try {
    const community = await CommunityModel.find();
    res.status(200).json(community);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const createCommunity = async (req, res) => {
  try {
    const { userId, cname, cprofile, ccover, cdesc } = req.body;
    const slug = cname.replace(" ", "-").toLowerCase();
    const user = await UserModel.findById(userId).select(
      "-password -notification"
    );

    const NewCommunity = new CommunityModel({
      userId,
      cname: cname,
      cdesc: cdesc,
      cprofile: cprofile,
      ccover: ccover,
      owner: user,
      slug: slug,
    });
    const newcommunity = await NewCommunity.save();

    res.status(201).json(newcommunity);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const getSingleCommunity = async (req, res) => {
  try {
    const { slug } = req.params;
    const community = await CommunityModel.findOne({ slug: slug });
    res.status(200).json(community);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const JoinCommunity = async (req, res) => {
  try {
    const { communityId, userId } = req.params
    const community = await CommunityModel.findById(communityId)
    const user = await UserModel.findById(userId)
    const join = {
      name: user.name,
      username: user.username,
      userProfile: user.userProfile,
      isApproved: false
    }
    await community.updatedOne({$push : { members: join }})
    res.status(200).json(join)
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
}
