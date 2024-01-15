import mongoose from "mongoose";
// import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../Models/User.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.create({ name, email, password });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      res.status(404).send("Invalid credentials");
    }
    const match = user.password === password;
    if (match) {
      const token = await jwt.sign({ id: user._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(user);
    } else {
      res.status(404).send("Invalid credentials");
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    console.log(err.message);
  }
};


export const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json("Subscription successfull.")
  } catch (err) {
    next(err);
  }
};

export const unsubscribe = async (req, res, next) => {
  try {
    try {
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { subscribedUsers: req.params.id },
      });
      await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: -1 },
      });
      res.status(200).json("Unsubscription successfull.")
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};


export const googleAuth = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(user);
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT);
      res.cookie("access_token", token, {
        httpOnly: true,
      });
      res.status(200).json(savedUser);
    }
  } catch (err) {
    console.log(err);
  }
};
