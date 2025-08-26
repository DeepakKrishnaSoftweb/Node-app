const mongoose = require("mongoose");

const menuSchemas = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  taste: {
    type: String,
    Enumerator: ["sweet", "sour", "spicy"],
    require: true,
  },
  is_drink: {
    type: Boolean,
    require: true,
  },
  ingredients: {
    type: [String],
    default: [],
  },
  num_sales: {
    type: Number,
    default: 0,
  },
});

const menus = mongoose.model("menus", menuSchemas);

module.exports = menus;
