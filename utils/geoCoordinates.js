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
    if (!result) return 404;
    response.source.name = result[0].name;
    response.source.latitude = result[0].latitude;
    response.source.longitude = result[0].longitude;
    response.source.country = result[0].country;

    //getting geo-cordinates of destination
    const desres = await fetch(desurl, options);
    result = await desres.json();
    if (!result) return 404;
    response.destination.name = result[0].name;
    response.destination.latitude = result[0].latitude;
    response.destination.longitude = result[0].longitude;
    response.destination.country = result[0].country;
    // console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    return 404;
  }
}
module.exports = getCoordinate;
