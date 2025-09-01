const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("StudentDB", "root", "mysql@123", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;

// /// Import models
// const FrontEnd = require("./../models/frontend")(sequelize, DataTypes);
// // const BackEnd = require("./../models/backend")(sequelize, DataTypes);
// // const DataType = require("./../models/datatype")(sequelize, DataTypes);

// // /// Associations
// // FrontEnd.hasMany("Backend", { foreignKey: "frontendId" });
// // BackEnd.belongsTo("FrontEnd", { foreignKey: "frontendId" });

// // BackEnd.hasMany("DataType", { foreignKey: "backendId" });
// // DataType.belongsTo("BackEnd", { foreignKey: "backendId" });
// //const db = { sequelize, Sequelize, DataTypes, FrontEnd, BackEnd, DataType };

// const db = { sequelize, Sequelize, DataTypes, FrontEnd };

// module.exports = db;
