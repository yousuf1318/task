const mongoose = require("mongoose");

const schema = mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  DOB: {
    type: String,
  },
});

module.exports = mongoose.model("regiter", schema);
