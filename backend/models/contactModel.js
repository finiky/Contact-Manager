const mongoose = require("mongoose");
const Schema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true],
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add a contact name"],
    },
    email: {
      type: String,
      required: [true, "Please add a contact email"],
    },
    phone: {
      type: String,
      required: [true, "Please add a phone number"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", Schema);
