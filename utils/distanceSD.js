const fetch = require("node-fetch");
//Calculate distance between source and destination
async function distanceCal(geocordinate) {
  const src_lat = geocordinate.source.latitude;
  const src_long = geocordinate.source.longitude;
  const dest_lat = geocordinate.destination.latitude;
  const dest_long = geocordinate.destination.longitude;
  const url = `https://distance-calculator8.p.rapidapi.com/calc?startLatitude=${src_lat}&startLongitude=${src_long}&endLatitude=${dest_lat}&endLongitude=${dest_long}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key":
        "eea77d6b3dmsh2d5cf948f4eb614p1a0564jsn64741ffa75ab" ||
        process.env.RAPIDAPIKEY,
      "X-RapidAPI-Host": "distance-calculator8.p.rapidapi.com",
    },
  };
  const distance = {};
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    // console.log(result);
    //adding 150 km for more pricious calculation
    distance["kilometers"] = Math.floor(result.body.distance.kilometers + 150);
    distance["meters"] = Math.floor(result.body.distance.meters + 150 * 1000);
    return distance;
  } catch (error) {
    console.error(error);
    return 404;
  }
}
module.exports = distanceCal;
