const mongoose = require("mongoose");

const transSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
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
  image: {
    type: String,
  },
  recurring: {
    type: Boolean,
  },
});

module.exports = mongoose.model("transaction", transSchema);
