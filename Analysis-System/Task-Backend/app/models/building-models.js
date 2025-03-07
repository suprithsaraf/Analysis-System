const mongoose = require("mongoose");

const BuildingDesignSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    facadeDimensions: [
      {
        direction: {
          type: String,
          enum: ["North", "South", "East", "West"],
          required: true,
        },
        height: {
          type: Number,
          required: true,
        },
        width: {
          type: Number,
          required: true,
        },
        wwr: {
          type: Number,
          required: true,
          min: 0,
          max: 1,
        },
      },
    ],
    skylight: {
      height: { type: Number },
      width: {
        type: Number,
      },
    },
    shgc: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
    },
  },
  { timestamps: true }
);

module.exports = BuildingDesignSchema;
