const User = require("../models/userModel.js");
const CustomError = require("../services/customError.js");
const asyncWrapper = require("../utils/asyncWrapper.js");

const getAllusers = asyncWrapper(async function (req, res) {
  const queryObject = {};
  let result = User.find({});
  finalData = await result;

  res.status(200).json({ success: true, data: finalData });
});

const getuser = asyncWrapper(async function (req, res, next) {
  const userId = req.params.id;
  const result = await User.findById(userId);

  if (!result) {
    return next(new CustomError("No such User found!", 404));
  }

  res.status(200).json({ success: true, data: result });
});

const adduser = asyncWrapper(async function (req, res) {
  const { fname, lname, email, password } = req.body;

  try {
    const user = await User.create({ fname, lname, email, password });

    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(new CustomError("Failed to create user", 500));
  }
});

const updateuser = asyncWrapper(async function (req, res) {
  const { id } = req.params;
  const result = await User.findByIdAndUpdate(id, req.body, {
    returnOriginal: false,
  });

  if (!result) {
    next(new CustomError("No such user found!", 404));
  }

  res.status(200).json({ success: true, data: result });
});

const deleteuser = asyncWrapper(async function (req, res) {
  const { id } = req.params;
  const result = await User.findByIdAndDelete(id);
  if (!result) {
    next(new CustomError("No such User found!", 404));
  }
  res.status(200).json({ success: true, data: null });
});

module.exports = {
  getAllusers,
  getuser,
  adduser,
  updateuser,
  deleteuser,
};
