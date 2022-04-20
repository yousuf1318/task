const mongoose = require("mongoose");

const schema = mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  Selling_Price: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
  Cost_Price: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
  Loss: {
    type: mongoose.Types.Decimal128,
   
  },
  Loss_in_percent: {
    type: mongoose.Types.Decimal128,
   
  },
  User_ID: {
    type: String,
   
  },
});

module.exports = mongoose.model("P/L", schema);
