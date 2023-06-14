import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  UnauthenticatedError,
} from "../errorPackage/index.js";

const register = async (req, res, next) => {
  try {
    const { email, userName, password } = req.body;
    if (!email || !userName || !password) {
      throw new BadRequestError("Please Provide All Values");
    }
    const alreadyUser = await User.findOne({ email });
    if (alreadyUser) {
      throw new BadRequestError("Email Already Used");
    }
    const user = await User.create(req.body);
    res.json({
      user: {
        email: user.email,
        userName: user.userName,
        dateJoined: user.dateJoined,
        followers: user.followers,
        _id: user._id,
        __v: user.__v,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError("Please Provide All Values");
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new UnauthenticatedError("Invalid Email");
    }
    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      throw new UnauthenticatedError("Invalid Credentials");
    }
    user.password = undefined;
    res.json({
      user: {
        email: user.email,
        userName: user.userName,
        dateJoined: user.dateJoined,
        followers: user.followers,
        _id: user._id,
        __v: user.__v,
      },
    });
    ("login success");
  } catch (error) {
    next(error);
  }
};

const updateUser = (req, res) => {
  res.send("register user");
};

const test = (req, res) => {
  res.send("it works user");
};

export { register, login, updateUser, test };
