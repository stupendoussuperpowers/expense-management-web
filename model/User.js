const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  groups: {
    type: [String],
  },
});

module.exports = mongoose.model("user", userSchema);
