const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const employeeSchema = new mongoose.Schema({
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
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  salary: {
    type: Number,
    require: true,
  },
  work: {
    type: String,
    require: true,
  },
});

employeeSchema.pre("save", async function (next) {
  const employee = this;

  if (!employee.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(employee.password, salt);

    employee.password = hashPassword;
    next();
  } catch (err) {
    next(err);
  }
});

employeeSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
