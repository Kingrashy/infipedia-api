import { v4 as uuid } from "uuid";
import UserModel from "../models/UserModel.js";
import { communitydata } from "../community.js";
import CommunityModel from "../models/CommunityModel.js";

const community = [];

export const getAllCommunity = async (req, res) => {
  try {
    const fcommunity = communitydata;
    res.status(200).json(fcommunity);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const createCommunity = async (req, res) => {
  try {
    const { userId, cname, cProfile, ccover, cdesc } = req.body;
    const user = await UserModel.findById(userId).select(
      "-password -notification"
    );

    const NewCommunity = new CommunityModel({
      userId,
      cname: cname,
      cdesc: cdesc,
      cProfile: cProfile,
      ccover: ccover,
      owner: user,
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
    const { id } = req.params;
    const fc = communitydata.find((c) => c.cid === id);
    res.status(200).json(fc);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

export const addRules = async (req, res) => {
  try {
    const { text, name, username, userId } = req.body;
    const Newrule = {
      text: text,
      created: new Date().getTime(),
    };
    const owner = [
      {
        name: name,
        username: username,
        userId: userId,
        uProfile:
          "http://res.cloudinary.com/dregs1zje/image/upload/v1686969779/infipedia_profiles/ogbl3fjeqkrpprd89deg.jpg",
      },
    ];
    const { communityId } = req.params;
    const community = communitydata.find((c) => c.cid === communityId);
    const rules = community.rules.push({ owner, Newrule });
    res.status(200).json(Newrule);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};
