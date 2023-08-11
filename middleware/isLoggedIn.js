const jwt = require("jsonwebtoken");
const user = require("../models/user");
const SecretKey = "thisismysecretkeyforflightbookingapi";

async function isLoggedIn(req, res, next) {
  try {
    console.log(req.cookies);
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");
    // console.log(token);
    if (!token) throw new Error("Please Login First");
    const decode = jwt.verify(token, SecretKey);
    req.user = await user.findById(decode.id);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      login: false,
      message: "Please Login before accessing this route",
    });
  }
}
module.exports = isLoggedIn;
