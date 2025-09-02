/// Define express server
const express = require("express");
/// Define multer (for upload files)
const multer = require("multer");
/// Initialize router using express
const router = express.Router();

/// Import Employee model
const Employee = require("../models/employee");

/// Import Employee JWT
const {
  jwtMiddleware,
  generateJwtToken,
} = require("../middlewares/jwtMiddleware");

///Setup multer to store files in upload folder
/*const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const suffix = Date.now();

    cb(null, suffix + "-" + req.originalname);
  },
});

const upload = multer({storage: storage});

*/

// Image upload using base64
const storage = multer.memoryStorage();
const upload = multer({ storage });

/// Create Employee
router.post("/signup", upload.single("photo"), async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      /// Using multer image upload in file
      /* data.profilePhoto = req.file ? req.file.path : null; */

      data.profilePhoto = req.file ? req.file.buffer.toString("base64") : null;
    }
    const newEmployee = Employee(data);
    const response = await newEmployee.save();

    const payload = {
      id: response.id,
    };

    const token = await generateJwtToken(payload);

    res.status(200).json({ success: true, user: response, token: token });
  } catch (err) {
    console.log("Error", err);
    // Handle Mongoose unique error
    if (err.code === 11000) {
      return res.status(400).json({ error: "Email already exists" });
    } else {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

// Employee Login
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

/// Employee Profile
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

/// Get all employees
router.get("/", async (req, res) => {
  try {
    const response = await Employee.find();

    res.status(200).json({ employees: response });
  } catch (err) {
    console.log("Error : ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/// Get employee data by id
router.get("/:id", async (req, res) => {
  try {
    const employeeId = req.params.id;
    const response = await Employee.findById(employeeId);

    if (!response) {
      return res.status(404).json({ success: false, message: "No data found" });
    }
    res.status(200).json({ success: true, employee: response });
  } catch (err) {
    console.log("Error : ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/// Update employee data
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

    res.status(200).json({
      success: true,
      message: "Employee Data Updated Successfully",
      user: response,
    });
  } catch (err) {
    console.log("Error : ", err);
    // Handle Mongoose unique error
    if (err.code === 11000) {
      return res.status(400).json({ error: "Email already exists" });
    } else {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

/// Delete employee data
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
