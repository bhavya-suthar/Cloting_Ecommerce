const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

//register

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ userName, password: hashPassword, email });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successfully!!!!",
    });
  } catch (error) {
    console.log("🚀 ~ register ~ error:", error);
    res.status(500).json({
      success: false,
      message: "Some Error occured in registration time",
    });
  }
};

//login

const login = async (req, res) => {
  try {
  } catch (error) {
    console.log("🚀 ~ register ~ error:", error);
    res.status(500).json({
      success: false,
      message: "Some Error occured in registration time",
    });
  }
};

//logout

//auth middleware
module.exports = {registerUser}