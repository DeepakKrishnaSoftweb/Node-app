const BackEnd = require("../models/backend");

/// Create Backend Method
const createBackend = async (req, res) => {
  try {
    //const { name } = req.body;
    //const newBackEnd = await BackEnd.create({ name });
    const newData = req.body;

    if (req.file) {
      /// Using multer image upload in file
      newData.image = req.file ? req.file.path : null;
    }

    const response = await BackEnd.create(newData);

    /// JWT token payload
    const paylod = {
      id: response.id,
    };

    /// Generate jwt token
    const token = await generateJwtToken(paylod);
    res.status(201).json({
      success: true,
      message: "Backend data added succesfully",
      data: response,
      token: token,
    });
  } catch (err) {
    console.log("Error :", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const signInWithJWT = async (req, res) => {
  try {
    /// Fetching student data from request body
    const { username, password } = req.body;

    /// Checking the request body which have username and password empty or not
    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, error: "Username and password required" });
    }

    /// Query to check request username is available or not in Students table
    const user = await BackEnd.findOne({ where: { username: username } });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid username or password" });
    }

    /// JWT token payload
    const paylod = {
      id: user.id,
    };

    /// Generate jwt token
    const token = await generateJwtToken(paylod);

    res.status(200).json({
      success: true,
      message: "Backend signin successfully",
      token: token,
    });
  } catch (err) {
    console.log("Error", err);
    /// 500 Internal Server Error → Something broke on the server.
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

/// Fetching backend records
const getBackend = async (req, res) => {
  try {
    /// Firing query to get all backend data
    const response = await BackEnd.findAll();

    if (!response) {
      /// 404 Not Found → Resource not found.
      return res
        .status(404)
        .json({ success: false, message: "No Data Found", data: response });
    }

    /// 200 OK → Request succeeded, returns data.
    res.status(200).json({
      success: true,
      message: "Data fetch succesfully",
      data: response,
    });
  } catch (err) {
    console.log("Error : ", err);
    /// 500 Internal Server Error → Something broke on the server.
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

/// Fetching backend record by backend Id
const getBackendById = async (req, res) => {
  try {
    /// Fetching backend id from request parameter
    const backendId = req.params.id;

    /// Checking backend is available or not
    if (!backendId)
      /// 400 Bad Request → Invalid request (missing fields, wrong format).
      return res.status(400).json({
        success: false,
        error: "Please provide student id or valid student id",
      });

    /// Checking backend is available or not
    const data = await BackEnd.findByPk(backendId);

    /// Firing query to get backend data
    /// Here we define data[0] because if we have 3 rocords then we will get that specific data of that request id but other two record diplay as buffer data so if we user data[0] then only that record will display
    if (data.length === 0)
      /// 404 Not Found → Resource not found.
      return res.status(404).json({ success: false, error: "No data found!" });

    /// 200 OK → Request succeeded, returns data.
    res.status(200).json({ success: true, data: data });
  } catch (err) {
    console.log("Error : ", err);
    /// 500 Internal Server Error → Something broke on the server.
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

/// Update student record
const updateBackend = async (req, res) => {
  /// Fetching backend id from request parameter
  const backendId = req.params.id;

  /// Checking backendId is available or not in request parameter
  if (!backendId)
    /// 400 Bad Request → Invalid request (missing fields, wrong format).
    return res.status(400).json({
      success: false,
      error: "Please provide backend id or valid backend id",
    });

  /// Fetching backend data from request parameter
  const backendUpdatedData = req.body;

  if (req.file) {
    /// Using multer image upload in file
    backendUpdatedData.image = req.file ? req.file.path : null;
  }

  try {
    /// Firing query to update backend by id
    const [result] = await BackEnd.update(backendUpdatedData, {
      where: { id: backendId },
    });

    /// Checking backend data is available or not
    if (result === 0) {
      /// 404 Not Found → Resource not found.
      return res.status(404).json({
        success: false,
        error: "Data not found!",
      });
    }

    /// 200 OK → Request succeeded
    res
      .status(200)
      .json({ success: true, message: "Backend data updated successfully" });
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
};

/// Delete Backend record
const deleteBackend = async (req, res) => {
  try {
    /// Fetching backend id from request parameter
    const backendId = req.params.id;

    /// Checking backend id is available or not in request parameter
    if (!backendId)
      /// 400 Bad Request → Invalid request (missing fields, wrong format).
      return res.status(400).json({
        success: false,
        error: "Please provide backend id or valid backend id",
      });

    /// Firing query to delete backend by id
    const result = await BackEnd.destroy({ where: { id: backendId } });

    if (result === 0) {
      /// 404 Not Found → Resource not found.
      return res.status(404).json({
        success: false,
        error: "Data not found or already deleted",
      });
    }

    /// 200 OK → Request succeeded
    res
      .status(200)
      .json({ success: true, message: "Backend data deleted successfully" });
  } catch (err) {
    console.log("Error", err);
    /// 500 Internal Server Error → Something broke on the server.
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

module.exports = {
  createBackend,
  getBackend,
  getBackendById,
  updateBackend,
  deleteBackend,
  signInWithJWT,
};
