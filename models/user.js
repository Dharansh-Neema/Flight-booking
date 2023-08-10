const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required "],
    minLenght: [3, "Name should be of atleast 3 characters"],
    maxLenght: [40, "Name can't be greater than 40 character"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: [validator.isEmail, "Please enter valid Email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLenght: [6, "Minimum length of password should be 6"],
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
userSchema.pre("save", async function (next) {
  //If the password is not being modified we don't encrypt it again
  if (!this.isModified("password")) return next();
  //Strenthing the password by 10 rounds of salt
  this.password = await bcrypt.hash(this.password, 10);
});
module.exports = mongoose.model("user", userSchema);
