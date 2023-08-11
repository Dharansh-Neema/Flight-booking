const mongoose = require("mongoose");
const connectWithDB = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(
      "mongodb+srv://myAtlasDBUser:63bT8WMp7H*NN*G@myatlasclusteredu.sjfbbar.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(console.log("DB Connected Succesfully"))
    .catch((err) => {
      console.error("DB connection issue");
      console.log(err);
      process.exit(1);
    });
};
module.exports = connectWithDB;
