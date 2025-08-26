const mongoose = require("mongoose");
require("dotenv").config();

// Define the MongoDb connection url
const mongoUrl = process.env.DB_URL_LOCAL;

// Setup mongoDb Connections

mongoose.connect(mongoUrl);

// Get the default connection
const db = mongoose.connection;

// MongoDb listeners
db.on("connected", () => {
  console.log("Connected to MongoDb Server...");
});

db.on("error", (error) => {
  console.log("MongoDb Connection error", error);
});

db.on("disconnected", () => {
  console.log("Disonnected to MongoDb Server...");
});

/// Export Database connection
module.exports = { db };
