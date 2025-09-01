const { DataTypes } = require("sequelize");
const sequelize = require("./../db/sequelize-db");

const DataType = sequelize.define("DataType", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = DataType;
