const getCoordinate = require("../utils/geoCoordinates");
const distanceCal = require("../utils/distanceSD");
const fareCal = require("../utils/farecalculator");
const airportLocator = require("../utils/airportLocator");

exports.flightDetails = async (req, res, next) => {
  try {
    const { source, destination, date } = req.body;
    if (!source || !destination || !date) {
      throw new Error("Source, destinattion and date is required");
    }
    console.log(req.user);
    //getting the co-ordinates of source and destination
    const geocordinate = await getCoordinate(source, destination);
    // console.log("GeoCordinates\n", geocordinate);
    //Handling errors
    if (
      (!geocordinate.source.longitude || !geocordinate.source.latitude) &&
      geocordinate != 404
    )
      throw new Error("Source location don't exist ");
    if (
      (!geocordinate.destination.longitude ||
        !geocordinate.destination.latitude) &&
      geocordinate != 404
    )
      throw new Error("Destination location don't exist ");

    let airportDetails = await airportLocator(source, destination);
    if (airportDetails == 1001 || airportDetails == 404)
      throw new Error("No airport exist at requested source");
    if (airportDetails == 1010 || airportDetails == 404)
      throw new Error("No airport exist at requested destination");
    const distance = await distanceCal(geocordinate);
    const { name, email } = req.user;
    const fareDetails = await fareCal(date, distance);
    res.status(200).json({
      bookingBy: name,
      email,
      dateOfBooking: date,
      airportDetails,
      fareDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Some error occured while fetching flight details",
    });
  }
};
