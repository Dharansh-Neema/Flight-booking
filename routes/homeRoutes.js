const express = require("express");
const { flightDetails } = require("../controllers/fareCal");
const router = express.Router();
router.route("/price").post(flightDetails);
module.exports = router;
