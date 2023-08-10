const router = require("express").Router();

const { flightDetails } = require("../controllers/fareCal");
const isLoggedIn = require("../middleware/isLoggedIn");

router.route("/price").post(isLoggedIn, flightDetails);

module.exports = router;
