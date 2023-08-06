const fetch = require("node-fetch");

//Calculating flight fare between source and destination
async function fareCalcultor(distance, date) {
  try {
    const airlinesFare = {};
    //converting the date in js miliseconds for easy calculations
    let dateinMS = Date.parse(date);
    console.log(date, dateinMS);
    //initilaizing the variables
    let indigo = 1000,
      airasia = 1000,
      akasa = 1000,
      vistara = 1000;

    //if pessenger try to book the tickets within 48 hrs then price should be high
    //assume indigo Charges 25rs/km,
    // airasia charges 27 rs/km
    //akasa charges 27.9 rs/km
    // vistara chargers 29.8rs/km
    if (dateinMS - Date.now() <= 48 * 60 * 60 * 1000) {
      indigo = Math.floor(Number(distance.kilometers * 25));
      airasia = Math.floor(Number(distance.kilometers * 27));
      akasa = Math.floor(Number(distance.kilometers * 27.9));
      vistara = Math.floor(Number(distance.kilometers * 29.8));
    }

    //if pessenger try to book the tickets within 1-week then price should be moderately high
    //assume indigo Charges 15rs/km,
    // airasia charges 20 rs/km
    //akasa charges 22.2 rs/km
    // vistara chargers 25.3rs/km
    else if (dateinMS - Date.now() <= 7 * 24 * 60 * 60 * 1000) {
      indigo = Math.floor(Number(distance.kilometers * 15));
      airasia = Math.floor(Number(distance.kilometers * 20));
      akasa = Math.floor(Number(distance.kilometers * 22.2));
      vistara = Math.floor(Number(distance.kilometers * 25.3));
    }

    //for every other situation charge should be standard
    //assume indigo Charges 5rs/km,
    // airasia charges 6.5 rs/km
    //akasa charges 7 rs/km
    // vistara chargers 7.8rs/km
    else {
      indigo = Math.floor(Number(distance.kilometers * 5));
      airasia = Math.floor(Number(distance.kilometers * 6.5));
      akasa = Math.floor(Number(distance.kilometers * 7));
      vistara = Math.floor(Number(distance.kilometers * 7.8));
    }
    console.log(indigo, airasia, akasa, vistara);
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
module.exports = fareCalcultor;
