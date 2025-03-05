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

    console.log("🚀 ~ loginUser ~ checkUser:", checkUser)
    
    if (!checkUser)
     return res.json({
        success: false,
        message: "User doesn't exist! please register first",
      });

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    console.log("🚀 ~ loginUser ~ checkPasswordMatch:", checkPasswordMatch)
    
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect Password! please try again",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName
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
          userName: checkUser.userName
        },
      });
  } catch (error) {
    console.log("🚀 ~ register ~ error:", error);
    res.status(500).json({
      success: false,
      message: "Some Error occured in login time",
    });
  }
};

//logout

const logoutUser = (req, res) =>{
  res.clearCookie('token').json({success: true, message: "Logged out successfully!"})
}

//auth middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token
  if(!token)
    return res.status(401).json({success: false, message: "UnAuthorized user!"})

  try{
    const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
    req.user = decoded
    next()
  }
  catch(error){
    res.status(401).json({success: false, message: "UnAuthorized user!"})
  }
}

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };