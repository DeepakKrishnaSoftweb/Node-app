const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize-db");
const bcrypt = require("bcrypt");

const BackEnd = sequelize.define("BackEnd", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Before creating BackEnd -> hash password
BackEnd.beforeCreate(async (backend) => {
  const salt = await bcrypt.genSalt(10);
  backend.password = await bcrypt.hash(backend.password, salt);
});

// Before updating BackEnd password -> hash if changed
BackEnd.beforeUpdate(async (backend) => {
  if (backend.changed("password")) {
    const salt = await bcrypt.genSalt(10);
    backend.password = await bcrypt.hash(backend.password, salt);
  }
});

// Add instance method for password checking
BackEnd.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = BackEnd;
