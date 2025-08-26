const express = require("express");
const passport = require("./auth");
const db = require("./db.js");
const app = express();
require("dotenv").config();
app.use(express.json());

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate("local", { session: false });

app.get("/", localAuthMiddleware, (req, res) => {
  res.send("Welcome to Nodejs Tutorial");
});

const personRoutes = require("./routes/personRoutes");
const menusRoutes = require("./routes/menusRoutes");

app.use("/person", personRoutes);
app.use("/menus", menusRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Listening to port number 3000");
});
