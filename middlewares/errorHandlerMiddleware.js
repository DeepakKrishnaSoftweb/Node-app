// middleware/errorHandler.js
function errorHandler(err, req, res, next) {
  console.error("Error:", err);

  // Handle MySQL invalid column error
  if (err.code === "ER_BAD_FIELD_ERROR") {
    return res.status(400).json({
      success: false,
      error: "Invalid field in request body",
    });
  }

  // Handle missing params (custom error example)
  if (err.type === "MISSING_PARAM") {
    return res.status(400).json({
      success: false,
      error: err.message || "Missing required parameter",
    });
  }

  // Handle resource not found (custom error example)
  if (err.type === "NOT_FOUND") {
    return res.status(404).json({
      success: false,
      error: err.message || "Resource not found",
    });
  }

  // Default to 500 Internal Server Error
  res.status(500).json({
    success: false,
    error: "Internal server error",
  });
}

module.exports = errorHandler;
