const express = require("express");
//Declaring app
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();
//Regulare middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const dbconfig = require("./config/dbconfig");
dbconfig();
//Importing routes
const Homeroutes = require("./routes/homeRoutes");
const userRoutes = require("./routes/userRoutes");
app.get("/", (req, res) => {
  res.send("Welcome to Flight Booking System");
});
app.use("/", Homeroutes);
app.use("/api/", userRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
