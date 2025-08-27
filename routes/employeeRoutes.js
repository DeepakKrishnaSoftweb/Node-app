const express = require("express");

const router = express.Router();
const Employee = require("../models/employee");
const { jwtMiddleware, generateJwtToken } = require("../employeeJwt");

router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const newEmployee = Employee(data);

    const response = await newEmployee.save();

    const payload = {
      id: response.id,
    };

    const token = await generateJwtToken(payload);

    res.status(200).json({ success: true, user: response, token: token });
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/signIn", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Employee.findOne({ username: username });

    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ error: "Invalid username and password" });

    const paylod = {
      id: user.id,
    };
    const token = await generateJwtToken(paylod);

    res.status(200).json({ success: true, token: token });
  } catch (err) {
    console.log("Error : ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/profile", jwtMiddleware, async (req, res) => {
  try {
    const employeeData = req.user;
    const user = await Employee.findById(employeeData.id);

    res.status(200).json({ success: true, user: user });
  } catch (err) {
    console.log("Error : ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const response = await Employee.find();

    res.status(200).json({ employees: response });
  } catch (err) {
    console.log("Error : ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const employeeId = req.params.id;
    const response = await Employee.findById(employeeId);
    res.status(200).json({ success: true, employee: response });
  } catch (err) {
    console.log("Error : ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/update", jwtMiddleware, async (req, res) => {
  try {
    const employeeData = req.user;
    const updatedData = req.body;

    const response = await Employee.findByIdAndUpdate(
      employeeData.id,
      updatedData,
      {
        new: true, // Return the updated documents
        runValidators: true, // Mongoose validator
      }
    );

    if (!response) {
      console.log("Data not found");
      res.status(404).json({ error: "Employee Not Found" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Employee Data Updated Successfully",
        user: response,
      });
  } catch (err) {
    console.log("Error : ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/delete", jwtMiddleware, async (req, res) => {
  try {
    const employeeData = req.user;

    const response = await Employee.findByIdAndDelete(employeeData.id);

    if (!response) {
      console.log("Data not found");
      res.status(404).json({ error: "Employee Not Found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Employee Deleted Successfully" });
  } catch (err) {
    console.log("Error : ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
