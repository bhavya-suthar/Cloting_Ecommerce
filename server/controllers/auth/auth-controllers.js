const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

//register

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.json({
        success: false,
        message: "User already exist with the same email! please try again",
      });
    }

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

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });

    if (!checkUser)
      res.json({
        success: false,
        message: "User doesn't exist! please register first",
      });

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch)
      res.json({
        success: false,
        message: "Incorrect Password! please try again",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    res
      .cookie("token", token, { httpOnly: true, secure: false })
      .json({
        success: true,
        message: "Logged in successfully",
        user: {
          email: checkUser.email,
          role: checkUser.role,
          id: checkUser._id,
        },
      });
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
module.exports = { registerUser, loginUser };
