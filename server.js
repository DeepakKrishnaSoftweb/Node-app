const express = require("express");
const passport = require("./auth");
const db = require("./db.js");
const app = express();
require("dotenv").config();
app.use(express.json());

app.use(passport.initialize());

//
const personRoutes = require("./routes/personRoutes");
const menusRoutes = require("./routes/menusRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

app.use("/person", personRoutes);
app.use("/menus", menusRoutes);
app.use("/employee", employeeRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, "127.0.0.1", () => {
  console.log("Listening to port number 127.0.0.1:3000");
});

// app.listen(PORT, () => {
//   console.log("Listening to port number 3000");
// });
