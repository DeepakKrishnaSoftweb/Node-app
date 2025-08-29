const express = require("express");
const router = express.Router();

const Person = require("./../models/Person");
const {
  jwtMiddleware,
  generateToken,
} = require("../middlewares/employeeJwtMiddleware");

router.post("/signup", async (req, res) => {
  try {
    const data = req.body;

    const newPerson = new Person(data);
    const response = await newPerson.save();

    // Generating JWT token using userdata payload

    const payload = {
      id: response.id,
    };

    const token = generateToken(payload);

    console.log("Token : ", token);
    res.status(200).json({ user: response, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
