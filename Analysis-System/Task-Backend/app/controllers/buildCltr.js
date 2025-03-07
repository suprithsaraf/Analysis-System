const express = require("express");
const BuildingDesign = require("../models/building-models");
const { validationResult } = require("express-validator");

const buildCltr = {};

buildCltr.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  try {
    const design = new BuildingDesign(req.body);
    await design.save();
    res.status(201).json(design);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
buildCltr.alldetails = async (req, res) => {
  const designs = await BuildingDesign.find();
  res.json(designs);
};
buildCltr.single = async (req, res) => {
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  const design = await BuildingDesign.findById(req.params.id);
  if (!design) {
    return res.status(404).json({ errors: "Design not found" });
  }
  res.json(design);
};
buildCltr.delete = async (req, res) => {
  try {
    const deletedDesign = await BuildingDesign.findByIdAndDelete(req.params.id);
    return res.status(200).json(deletedDesign);
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
};
module.exports = buildCltr;
