/// Define express server
const express = require("express");
/// Import Passport for local strategy
const passport = require("./local_passport/auth.js");

/// Define MongoDb Database
//const mongoDb = require("./db/mongo-db.js");

/// Define Mysql Database
const mySqlPool = require("./db/mysql-db.js");
/// Initialize express server
const app = express();
/// Initialize dotenv config
require("dotenv").config();

/// Send data from client → server in JSON format
app.use(express.json());

/// Initialize passport
app.use(passport.initialize());

// Define routers
const personRoutes = require("./routes/personRoutes");
const menusRoutes = require("./routes/menusRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const studentRoutes = require("./routes/studentRoutes");

// Calling routers
app.use("/person", personRoutes);
app.use("/menus", menusRoutes);
app.use("/employee", employeeRoutes);
app.use("/student", studentRoutes);

const PORT = process.env.PORT || 3000;

// app.listen(PORT, "127.0.0.1", () => {
//   console.log("Listening to port number 127.0.0.1:3000");
// });

app.listen(PORT, () => {
  console.log("Listening to port number 3000");
});
