const BackEnd = require("./../models/backend");
const FrontEnd = require("./../models/frontend");
const DataType = require("./../models/datatype");

// Relation (One frontend has many backends)
FrontEnd.hasMany(BackEnd, { foreignKey: "frontendId" });
BackEnd.belongsTo(FrontEnd, { foreignKey: "frontendId" });

BackEnd.hasMany(DataType, { foreignKey: "backendId" });
DataType.belongsTo(BackEnd, { foreignKey: "backendId" });

module.exports = { FrontEnd, BackEnd, DataType };
