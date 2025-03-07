const mongoose = require("mongoose");

const AnalysisResultSchema = new Schema(
  {
    designId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BuildingDesign",
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    heatGain: {
      type: Number,
      required: true,
    },
    coolingLoad: {
      type: Number,
      required: true,
    },
    energyConsumed: {
      type: Number,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = AnalysisResultSchema;
