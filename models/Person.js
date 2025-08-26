const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

personSchema.pre("save", async function (next) {
  const person = this;

  if (!person.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(person.password, salt);

    person.password = hashPassword;
    next();
  } catch (err) {
    next(err);
  }
});

personSchema.methods.comparePassword = async (candidatePassword) => {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};

//Create Person Model
const Person = mongoose.model("Person", personSchema);

module.exports = Person;
