const { timeStamp } = require("console");
const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: String,
    email: {
      type: String,
      required: true,
    },
    password: String,
  },
  { timeStamp: true }
);

const User = model("User", userSchema);

module.exports = User;
