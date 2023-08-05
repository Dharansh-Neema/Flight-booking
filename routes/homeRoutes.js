const express = require("express");
const { fareCalculator } = require("../controllers/fareCal");
const router = express.Router();
router.route("/price").post(fareCalculator);
module.exports = router;
