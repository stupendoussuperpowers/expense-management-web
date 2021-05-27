const mongoose = require("mongoose");

const transSchema = mongoose.Schema({
  groupID: {
    type: String,
    required: true,
  },
  groupName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("group", transSchema);
