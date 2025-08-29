/// Express server
const express = require("express");

/// Initialize router using express
const router = express.Router();

/// Define database from mysql-sb.js
const mysqlDb = require("../db/mysql-db");

/// Define multer (for upload files)
const multer = require("multer");

/// Error handler middleware
const errorHandler = require("../middlewares/errorHandlerMiddleware");

/// Import Employee JWT
const {
  jwtMiddleware,
  generateJwtToken,
} = require("../middlewares/employeeJwtMiddleware");

// Register error handler
router.use(errorHandler);

///Setup multer to store files in upload folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const suffix = Date.now();

    cb(null, suffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

/// Image upload using base64
/*const storage = multer.memoryStorage();
const upload = multer({ storage }); */

/// Fetching student records
router.get("/getAll", async (req, res) => {
  try {
    /// Firing query to get all student data
    const response = await mysqlDb.query("SELECT * FROM Students");

    if (!response) {
      /// 404 Not Found → Resource not found.
      return res
        .status(404)
        .json({ success: false, message: "No Data Found", students: response });
    }

    /// 200 OK → Request succeeded, returns data.
    res.status(200).json({ success: true, students: response[0] });
  } catch (err) {
    console.log("Error : ", err);
    /// 500 Internal Server Error → Something broke on the server.
    errorHandler.res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
});

/// Fetching student record by student Id
router.get("/get/:id", async (req, res) => {
  try {
    /// Fetching student id from request parameter
    const studentId = req.params.id;

    /// Checking student is available or not
    if (!studentId)
      /// 400 Bad Request → Invalid request (missing fields, wrong format).
      return res.status(400).json({
        success: false,
        error: "Please provide student id or valid student id",
      });

    /// Checking student is available or not
    const data = await mysqlDb.query("SELECT * FROM Students WHERE id=?", [
      studentId,
    ]);

    /// Firing query to get student data
    /// Here we define data[0] because if we have 3 rocords then we will get that specific data of that request id but other two record diplay as buffer data so if we user data[0] then only that record will display
    if (data[0].length === 0)
      /// 404 Not Found → Resource not found.
      return res.status(404).json({ success: false, error: "No data found!" });

    /// 200 OK → Request succeeded, returns data.
    res.status(200).json({ success: true, student: data[0] });
  } catch (err) {
    console.log("Error : ", err);
    /// 500 Internal Server Error → Something broke on the server.
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

/// Create student record
router.post("/create", upload.single("profile_photo"), async (req, res) => {
  try {
    /// Fetching student data from body
    const studentNewData = req.body;

    if (req.file) {
      /// Using multer image upload in file
      studentNewData.profile_photo = req.file ? req.file.path : null;

      //studentNewData.profilePhoto = req.file ? req.file.buffer.toString("base64") : null;
    }

    /// Firing query to create student
    const [response] = await mysqlDb.query("INSERT INTO Students SET ?", [
      studentNewData,
    ]);

    /// 201 Created → Resource created successfully (e.g., after POST).
    res.status(201).json({
      success: true,
      message: "Student created successfully",
    });
  } catch (err) {
    console.log("Error", err);
    /// 500 Internal Server Error → Something broke on the server.
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

/// Signin student
router.post("/signin", async (req, res) => {
  try {
    /// Fetching student data from request body
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, error: "Username and password required" });
    }

    const [students] = await mysqlDb.query(
      "SELECT * FROM Students WHERE username =?",
      [username]
    );

    if (students.length === 0) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid username or password" });
    }

    const student = students[0];

    const paylod = {
      id: student.id,
    };
    const token = await generateJwtToken(paylod);

    res.status(200).json({
      success: true,
      message: "Student signin successfully",
      token: token,
    });
  } catch (err) {
    console.log("Error", err);
    /// 500 Internal Server Error → Something broke on the server.
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

/// Update student record
router.put("/update/:id", upload.single("profile_photo"), async (req, res) => {
  /// Fetching student id from request parameter
  const studentId = req.params.id;

  /// Checking studentId is available or not in request parameter
  if (!studentId)
    /// 400 Bad Request → Invalid request (missing fields, wrong format).
    return res.status(400).json({
      success: false,
      error: "Please provide student id or valid student id",
    });

  /// Fetching student data from request parameter
  const studentUpdatedData = req.body;

  if (req.file) {
    /// Using multer image upload in file
    studentUpdatedData.profile_photo = req.file ? req.file.path : null;

    //studentUpdatedData.profilePhoto = req.file ? req.file.buffer.toString("base64") : null;
  }

  try {
    /// Firing query to update student by id
    const [result] = await mysqlDb.query("UPDATE Students SET ? WHERE id =?", [
      studentUpdatedData,
      studentId,
    ]);

    /// Checking student data is available or not
    if (result.affectedRows === 0) {
      /// 404 Not Found → Resource not found.
      return res.status(404).json({
        success: false,
        error: "Student not found!",
      });
    }

    /// 200 OK → Request succeeded
    res
      .status(200)
      .json({ success: true, message: "Student updated successfully" });
  } catch (err) {
    console.log("Error", err);
    /// 400 Bad Request → Invalid request (missing fields, wrong format).
    if (err.code === "ER_BAD_FIELD_ERROR") {
      return res.status(400).json({
        success: false,
        error: "Invalid field in request body",
      });
    }
    /// 500 Internal Server Error → Something broke on the server.
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

/// Delete student record
router.delete("/delete/:id", async (req, res) => {
  try {
    /// Fetching student id from request parameter
    const studentId = req.params.id;

    /// Checking student id is available or not in request parameter
    if (!studentId)
      /// 400 Bad Request → Invalid request (missing fields, wrong format).
      return res.status(400).json({
        success: false,
        error: "Please provide student id or valid student id",
      });

    /// Firing query to delete student by id
    const [result] = await mysqlDb.query("DELETE FROM Students WHERE id = ?", [
      studentId,
    ]);

    if (result.affectedRows === 0) {
      /// 404 Not Found → Resource not found.
      return res.status(404).json({
        success: false,
        error: "Student not found or already deleted",
      });
    }

    /// 200 OK → Request succeeded
    res
      .status(200)
      .json({ success: true, message: "Student deleted successfully" });
  } catch (err) {
    console.log("Error", err);
    /// 500 Internal Server Error → Something broke on the server.
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

module.exports = router;
