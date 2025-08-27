const express = require("express");
const passport = require("./auth");
const db = require("./db.js");
const app = express();
require("dotenv").config();
app.use(express.json());

app.use(passport.initialize());

/// 404 handler for wrong endpoints
// app.use((req, res, next) => {
//   try {
//     res.status(404).json({
//       success: false,
//       message: "The requested endpoint does not exist",
//       path: req.originalUrl,
//     });
//     next();
//   } catch (err) {
//     console.log("Error : ", err);
//     next(err);
//   }
// });

/// Centralized error handler
// app.use((err, req, res, next) => {
//   try {
//     console.error(err.stack);
//     res.status(err.status || 500).json({
//       success: false,
//       message: err.message || "Something went wrong!",
//     });
//     next();
//   } catch (err) {
//     console.log("Error : ", err);
//     next(err);
//   }
// });

const personRoutes = require("./routes/personRoutes");
const menusRoutes = require("./routes/menusRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

app.use("/person", personRoutes);
app.use("/menus", menusRoutes);
app.use("/employee", employeeRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Listening to port number 3000");
});
