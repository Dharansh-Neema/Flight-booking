const fetch = require("node-fetch");
async function getCoordinate(source, destination) {
  try {
    const sourceurl = `https://geocoding-by-api-ninjas.p.rapidapi.com/v1/geocoding?city=${source}`;
    const desurl = `https://geocoding-by-api-ninjas.p.rapidapi.com/v1/geocoding?city=${destination}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPIKEY,
        "X-RapidAPI-Host": "geocoding-by-api-ninjas.p.rapidapi.com",
      },
    };
    const response = {
      source: {},
      destination: {},
    };
    //Getting Geo-cordinates of source
    const srcres = await fetch(sourceurl, options);
    let result = await srcres.json();
    response.source.name = result[0].name;
    response.source.latitude = result[0].latitude;
    response.source.longitude = result[0].longitude;
    response.source.country = result[0].country;

    //getting geo-cordinates of destination
    const desres = await fetch(desurl, options);
    result = await desres.json();
    response.destination.name = result[0].name;
    response.destination.latitude = result[0].latitude;
    response.destination.longitude = result[0].longitude;
    response.destination.country = result[0].country;
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    return 404;
  }
}
//Calculate distance between two points
async function distanceCal(geocordinate) {
  const src_lat = geocordinate.source.latitude;
  const src_long = geocordinate.source.longitude;
  const dest_lat = geocordinate.destination.latitude;
  const dest_long = geocordinate.destination.longitude;
  const url = `https://distance-calculator8.p.rapidapi.com/calc?startLatitude=${src_lat}&startLongitude=${src_long}&endLatitude=${dest_lat}&endLongitude=${dest_long}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.RAPIDAPIKEY,
      "X-RapidAPI-Host": "distance-calculator8.p.rapidapi.com",
    },
  };
  const distance = {};
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    //adding 150 km for more pricious calculation
    distance["kilometers"] = Math.floor(result.body.distance.kilometers + 150);
    distance["meters"] = Math.floor(result.body.distance.meters + 150 * 1000);
    return distance;
  } catch (error) {
    console.error(error);
    return 404;
  }
}
//Calculating flight fare for two different locations
async function fareCalcultor(geocordinate, distance) {
  try {
    const airlinesFare = {};
    //assume indigo Charges 5rs/km,
    // airasia charges 6.5 rs/km
    //akasa charges 7 rs/km
    // vistara chargers 7.8rs/km
    let indigo = Math.floor(Number(distance.kilometers * 5));
    let airasia = Math.floor(Number(distance.kilometers * 6.5));
    let akasa = Math.floor(Number(distance.kilometers * 7));
    let vistara = Math.floor(Number(distance.kilometers * 7.8));
    airlinesFare.indigo = indigo;
    airlinesFare.airasia = airasia;
    airlinesFare.akasa = akasa;
    airlinesFare.vistara = vistara;
    console.log(airlinesFare);
    return airlinesFare;
  } catch (error) {
    console.log(error);
    return 404;
  }
}
exports.flightDetails = async (req, res, next) => {
  try {
    const { source, destination, date } = req.body;
    if (!source || !destination || !date) {
      throw new Error("Source, destinattion and date is required");
    }
    //getting the co-ordinates of source and destination
    const geocordinate = await getCoordinate(source, destination);
    // console.log("GeoCordinates\n", geocordinate);
    //Handling errors
    if (!geocordinate.source.longitude || !geocordinate.source.latitude)
      throw new Error("Source location invalid ");
    if (
      !geocordinate.destination.longitude ||
      !geocordinate.destination.latitude
    )
      throw new Error("Destination location invalid ");

    const distance = await distanceCal(geocordinate);

    const fareDetails = await fareCalcultor(geocordinate, distance);
    res.status(200).json({ sucess: true, geocordinate, distance, fareDetails });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      sucess: false,
      message: "Some error occured while fetching flight details",
    });
  }
};
