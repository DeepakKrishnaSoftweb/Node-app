const mongoose = require("mongoose");

//Define the person schema

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
});

//Create Person Model
const Person = mongoose.model("Person", personSchema);

module.exports = Person;
