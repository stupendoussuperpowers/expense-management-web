const mongoose = require("mongoose");

const transSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  groupID: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  memo: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("transaction", transSchema);
