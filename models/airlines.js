const mongoose = require("mongoose");
const airlineSchema = new mongoose.Schema({
  indigo: {
    ICAO: {
      type: String,
      default: "IGO",
    },
    name: {
      type: String,
      default: "Indigo Airlines",
    },
    cost: {
      cpk: {
        // cok-> cost per kilometer
        type: Number,
        default: 5.2,
      },
      cpkImmediate: {
        //cost per kilometer if the date of booking is within 48 hours
        type: Number,
        default: 22,
      },
      cpkWeek: {
        //cost per kilometer if the date of booking is within 1 week
        type: Number,
        default: 13.4,
      },
    },
  },
  airasia: {
    ICAO: {
      type: String,
      default: "IAD",
    },
    name: {
      type: String,
      default: "AirAsia",
    },
    cost: {
      cpk: {
        // cok-> cost per kilometer
        type: Number,
        default: 6.9,
      },
      cpkImmediate: {
        //cost per kilometer if the date of booking is within 48 hours
        type: Number,
        default: 23.8,
      },
      cpkWeek: {
        //cost per kilometer if the date of booking is within 1 week
        type: Number,
        default: 14.5,
      },
    },
  },
  akasa: {
    ICAO: {
      type: String,
      default: "AKJ",
    },
    name: {
      type: String,
      default: "AKASA AIR",
    },

    cost: {
      cpk: {
        // cok-> cost per kilometer
        type: Number,
        default: 8.6,
      },
      cpkImmediate: {
        //cost per kilometer if the date of booking is within 48 hours
        type: Number,
        default: 24.6,
      },
      cpkWeek: {
        //cost per kilometer if the date of booking is within 1 week
        type: Number,
        default: 13.7,
      },
    },
  },
  vistara: {
    ICAO: {
      type: String,
      default: "VTI",
    },
    name: {
      type: String,
      default: "Vistara Airlines",
    },
    cost: {
      cpk: {
        // cok-> cost per kilometer
        type: Number,
        default: 7.8,
      },
      cpkImmediate: {
        //cost per kilometer if the date of booking is within 48 hours
        type: Number,
        default: 26.8,
      },
      cpkWeek: {
        //cost per kilometer if the date of booking is within 1 week
        type: Number,
        default: 15.8,
      },
    },
  },
});

module.exports = mongoose.model("airline", airlineSchema);
