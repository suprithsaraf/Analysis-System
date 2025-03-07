const mongoose = require("mongoose");

const CityDataSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  solarRadiation: {
    North: { type: Number, required: true },
    South: { type: Number, required: true },
    East: { type: Number, required: true },
    West: { type: Number, required: true },
    Roof: { type: Number, required: true },
  },
  electricityRate: {
    type: Number,
    required: true,
  },
});

module.exports = CityDataSchema;
