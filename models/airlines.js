const mongoose = require("mongoose");

const airlineSchema = new mongoose.Schema({
  name: String,
  ICAO: String,
  //cpk stands for cost per kilometer
  cost: {
    cpk: {
      type: Number,
      min: [5, "Cost can't be less than 5rs/km"],
      default: 5,
    },
    cpkImmediate: Number,
    cpkWeek: Number,
  },
});
module.exports = mongoose.model("airline", airlineSchema);
