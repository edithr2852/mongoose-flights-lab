const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const destinationSchema = new Schema(
  {
    airport: {
      type: String,
      enum: ["AUS", "DFW", "DEN", "LAX", "SAN"],
    },
    arrival: {
      type: Date,
    },
  },
  { timestamps: true }
);

const flightSchema = new Schema(
  {
    airline: {
      type: String,
      enum: ["Southwest", "Delta", "United", "American"],
    },
    airport: {
      type: String,
      enum: ["AUS", "DFW", "DEN", "LAX", "SAN"],
      default: "DEN",
    },
    flightNo: {
      type: Number,
      required: true,
      min: 10,
      max: 9999,
    },
    departs: {
      type: Date,
      default: new Date() + 525600000, //need to ask about one year from date created default
    },
    // destination is an array of destination subdocuments!
    destinations: [destinationSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Flight", flightSchema);