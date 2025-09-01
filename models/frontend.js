const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize-db");

const FrontEnd = sequelize.define(
  "FrontEnd",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "frontends", // custom table name
    timestamps: false, // disable createdAt & updatedAt
  }
);

module.exports = FrontEnd;
