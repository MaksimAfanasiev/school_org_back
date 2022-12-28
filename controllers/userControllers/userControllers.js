const User = require("../../models/userModel");
const Course = require("../../models/courseModel");
const bcrypt = require("bcryptjs");
const requestError = require("../../helpers/RequestError");
const jwt = require("jsonwebtoken");

const SALT = 5;
const JWT_KEY = "abracagurchik";

const createUser = async (req, res, next) => {
  try {
    const { firstName, secondName, group, password } = req.body;

    if (!firstName || !secondName || !group || !password) {
      throw requestError(400, "Provide required data");
    }

    const user = await User.find({ firstName, secondName, group });

    if (user.length) {
      throw requestError(400, "User is registered. Please login");
    }

    const hashedPassword = await bcrypt.hash(password, SALT);

    const courses = await Course.find({ class: req.body.group[0] });

    const newUser = await User.create({
      firstName,
      secondName,
      group,
      password: hashedPassword,
      courses,
    });

    const payload = {
      id: newUser._id,
    };

    const token = jwt.sign(payload, JWT_KEY, { expiresIn: "2h" });

    await User.findByIdAndUpdate(newUser._id, { token });

    res.status(201).json({
      id: newUser._id,
      firstName,
      secondName,
      group,
      token,
      courses,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { firstName, secondName, group, password } = req.body;

    if (!firstName || !secondName || !group || !password) {
      throw requestError(400, "Provide required data");
    }

    const user = await User.findOne({ firstName, secondName, group });

    if (!user) {
      throw requestError(400, "User is not exist");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw requestError(400, "Wrong password");
    }

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, JWT_KEY, { expiresIn: "2h" });
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { token },
      { new: true }
    );

    res.status(200).json({
      firstName,
      secondName,
      group,
      token: updatedUser.token,
    });
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { token: null });

    res.status(200).json({ message: "User logout" });
  } catch (error) {
    next(error);
  }
};

const getCurrent = async (req, res, next) => {
  const { _id, firstName, secondName, group } = req.user;

  res.status(200).json({
    id: _id,
    firstName,
    secondName,
    group,
  });
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  getCurrent,
};
