const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add a username."],
    },
    email: {
      type: String,
      required: [true, "Please add an email id."],
      unique: [true, "Email id is already registered."],
    },
    password: {
      type: String,
      require: [true, "Please add a password"],
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("User", Schema);
