const airline = require("../models/airlines");
const user = require("../models/user");
//To create new Airline
exports.addAirline = async (req, res) => {
  try {
    const { name, ICAO, cost } = req.body;
    if (!name || !ICAO || !cost) {
      throw new Error("Name, ICAO and cost of airpline is required");
    }
    const response = await airline.create({ name, ICAO, cost });
    // console.log(response);
    res.status(200).json({
      success: true,
      message: "Airpline is successfully added to DB",
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      sucess: false,
      Message: "Someting went wrong while adding airlines details",
    });
  }
};

//Routes to Update the price of airline
exports.updatecost = async (req, res, next) => {
  try {
    const { id, cost } = req.body;
    if (!id) throw new Error("The ID of airline is required");
    //Updating the cost
    const airlineInfo = await airline.findByIdAndUpdate(
      id,
      {
        "cost.cpk": cost.cpk,
        "cost.cpkWeek": cost.cpkWeek,
        "cost.cpkImmediate": cost.cpkImmediate,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!airlineInfo) {
      throw new Error("Airline not found please provide correct id");
    }
    // const newInfo = await airline.findById(id);
    res.status(201).json({
      success: true,
      message: "Price updated successfully",
      airlineInfo,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong while updating the cost of airlines",
    });
  }
};

//To delete a Particular airline
exports.removeAirline = async (req, res) => {
  try {
    const { id } = req.body;
    await airline.findByIdAndDelete(id);
    res.status(202).json({
      success: true,
      message: "Airline deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: true,
      message: "Airline deletion failed",
    });
  }
};
//To get all airlines info
exports.airlineInfo = async (req, res) => {
  try {
    const airlineInfo = await airline.find({});
    res.status(200).json({
      success: true,
      airlineInfo,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      success: false,
      message: "Something went wrong in DB",
    });
  }
};
//To get all user by admin
exports.getAllusers = async (req, res) => {
  try {
    const response = await user.find({});
    res.status(200).json({
      success: true,
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong while fetching all the users",
    });
  }
};
