const router = require("express").Router();

const { flightDetails } = require("../controllers/fareCal");
const isLoggedIn = require("../middleware/isLoggedIn");
//this route before accessing needed to be loggedIn
router.route("/booking").post(isLoggedIn, flightDetails);

module.exports = router;
