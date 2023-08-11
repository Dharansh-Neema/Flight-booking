const user = require("../models/user");
const cookieToken = require("../utils/cookieToken");
const bcrypt = require("bcrypt");

//signup routes
exports.signup = async (req, res) => {
  try {
    let { name, password, email } = req.body;
    if (!name || !password || !email)
      throw new Error("Name, Password , email is required");
    const response = await user.create({ name, email, password });
    cookieToken(res, response);
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Something went wrong " });
  }
};
//Login routes
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Email or Password is required for login");
    }
    const response = await user.findOne({ email });
    if (!response) {
      throw new Error("User not found, Please Signup first");
    }
    const isPasswordCorrect = bcrypt.compare(password, response.password);
    if (!isPasswordCorrect)
      throw new Error("Either Email or password is wrong ");
    cookieToken(res, response);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//Logout routes

exports.logout = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong while loging out",
    });
  }
};
