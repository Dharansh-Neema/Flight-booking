const jwt = require("jsonwebtoken");
function cookieToken(res, user) {
  const options = {
    expire: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), //cookie will expires in 2 days
    httpOnly: true,
  };
  const token = jwt.sign({ id: user.id }, process.env.SecretKey, {
    expiresIn: "2 days",
  });
  res.status(200).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
}
module.exports = cookieToken;
