customRole = (...roles) => {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {
        throw new Error("Only Authorized person are allowed");
      }
      next();
    } catch (error) {
      console.log(error);
      res.status(404).json({
        success: false,
        message: "Only Authorized person are allowed",
      });
    }
  };
};
module.exports = customRole;
