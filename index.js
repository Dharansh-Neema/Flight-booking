const express = require("express");
//Declaring app
const app = express();

const bodyParser = require("body-parser");
require("dotenv").config();
//Regulare middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//Importing routes
const Homeroutes = require("./routes/homeRoutes");
app.get("/", (req, res) => {
  res.send("Welcome to MMT");
});
app.use("/", Homeroutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
