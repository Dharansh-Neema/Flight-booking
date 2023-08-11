const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const customRole = require("../middleware/customRole");
const {
  addAirline,
  updatecost,
  getAllusers,
  airlineInfo,
  removeAirline,
} = require("../controllers/admin");

router.route("/addairline").post(isLoggedIn, customRole("admin"), addAirline);
router.route("/updatecost").post(isLoggedIn, customRole("admin"), updatecost);
router.route("/airline").get(isLoggedIn, customRole("admin"), airlineInfo);
router.route("/delete").delete(isLoggedIn, customRole("admin"), removeAirline);
router.route("/all/users").get(isLoggedIn, customRole("admin"), getAllusers);

module.exports = router;
