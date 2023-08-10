const router = require("express").Router();

const { flightDetails } = require("../controllers/fareCal");

router.route("/price").post(flightDetails);

module.exports = router;
