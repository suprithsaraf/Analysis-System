const mongoose = require("mongoose");

const configureDB = async () => {
  try {
    const db = await mongoose.connect("mongodb://127.0.0.1:27017/Task");
    console.log(" connected to db");
  } catch (err) {
    console.log(err);
  }
};

module.exports = configureDB;
