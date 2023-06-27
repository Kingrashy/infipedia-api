import { v4 as uuid } from "uuid";
import UserModel from "../models/UserModel.js";
import { communitydata } from "../community.js";

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
    const {
      userId,
      uUsername,
      uname,
      uProfile,
      cname,
      cProfile,
      cCover,
      cCat,
    } = req.body;

    const NewCommunity = {
      cname: cname,
      cProfile: cProfile,
      cCover: cCover,
      cCat: cCat,
      cid: uuid(),
      userId: userId,
      uname: uname,
      uProfile: uProfile,
      uUsername: uUsername,
    };
    communitydata.push(NewCommunity);
    res.status(201).json(NewCommunity);
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
