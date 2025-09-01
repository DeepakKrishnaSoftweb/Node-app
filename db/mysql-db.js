// Define Mysql package
const mysql = require("mysql2/promise");

// Define Dotenv package
const env = require("dotenv");

// Setup mysql Connections
const mySqlPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "mysql@123",
  database: "StudentDB",
});

// Mysql listeners
mySqlPool.on("connected", () => {
  console.log("Connected to Mysql Server...");
});

mySqlPool.on("error", (error) => {
  console.log("Mysql Connection error", error);
});

mySqlPool.on("disconnected", () => {
  console.log("Disonnected to Mysql Server...");
});

module.exports = mySqlPool;
