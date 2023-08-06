const fetch = require("node-fetch");
//locating the airport
async function airportLocator(source, destination) {
  const srcurl = `https://airports-by-api-ninjas.p.rapidapi.com/v1/airports?city=${source}`;
  const desturl = `https://airports-by-api-ninjas.p.rapidapi.com/v1/airports?city=${destination}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.RAPIDAPIKEY,
      "X-RapidAPI-Host": "airports-by-api-ninjas.p.rapidapi.com",
    },
  };
  let response = {
    source: {},
    destination: {},
  };
  try {
    let res = await fetch(srcurl, options);
    let result = await res.json();
    // console.log(result);
    if (!result) {
      console.log("Source is invalid");
      return 1001; //let's set status code of 1001 if there is no airport at the requested source
    }
    response.source.iata = result[0].iata;
    response.source.name = result[0].name;
    response.source.city = result[0].city;

    res = await fetch(desturl, options);
    result = await res.json();
    if (!result) {
      console.log("Destination is invalid");
      return 1010; //let's set status code of 1010 if there is no airport at the requested destination
    }
    response.destination.iata = result[0].iata;
    response.destination.name = result[0].name;
    response.destination.city = result[0].city;

    return response;
  } catch (error) {
    console.error(error);
    return 404;
  }
}
module.exports = airportLocator;
