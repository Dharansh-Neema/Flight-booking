const airline = require("../models/airlines");

//Calculating flight fare between source and destination
async function farecalculator(date, distance) {
  try {
    let dateinMS = Date.parse(date);
    if (dateinMS - Date.now() < 0) {
      return { message: "Booking date can't be in past" };
    }
    const airlineInfo = await airline.find({});
    // console.log(airlineInfo);
    let fare = [];
    //If the booking is within 48 hours then the charges applied will be high and following condition will take place
    if (dateinMS - Date.now() <= 48 * 60 * 60 * 1000) {
      airlineInfo.forEach((airLine) => {
        let flightDetails = {};
        flightDetails.name = airLine.name;
        flightDetails.ICAO = airLine.ICAO;
        flightDetails.cost = Math.floor(airLine.cost.cpkImmediate * distance); //calculating the fare
        fare.push(flightDetails);
      });
      //If the booking is within 1 week then the charges applied will be moderate to high and following condition will take place
    } else if (dateinMS - Date.now() <= 7 * 24 * 60 * 60 * 1000) {
      airlineInfo.forEach((airLine) => {
        let flightDetails = {};
        flightDetails.name = airLine.name;
        flightDetails.ICAO = airLine.ICAO;
        flightDetails.cost = Math.floor(airLine.cost.cpkWeek * distance); //calculating the fare
        fare.push(flightDetails);
      });

      //In any other case the charges applied will be normal or low and following condition will take place
    } else {
      airlineInfo.forEach((airLine) => {
        let flightDetails = {};
        flightDetails.name = airLine.name;
        flightDetails.ICAO = airLine.ICAO;
        flightDetails.cost = Math.floor(airLine.cost.cpk * distance); //calculating the fare
        fare.push(flightDetails);
      });
    }
    return fare;
  } catch (error) {
    console.log(error);
    return 404;
  }
}
module.exports = farecalculator;
