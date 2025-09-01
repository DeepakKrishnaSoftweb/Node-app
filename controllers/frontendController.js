const FrontEnd = require("../models/frontend");

/// Create FrontEnd Method
const createFrontEnd = async (req, res) => {
  try {
    //const { name } = req.body;
    //const newFrontEnd = await FrontEnd.create({ name });
    const data = req.body;
    const newFrontEnd = await FrontEnd.create(data);

    res.status(201).json({
      success: true,
      message: "Frontend data added succesfully",
      data: newFrontEnd,
    });
  } catch (err) {
    console.log("Error :", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

module.exports = { createFrontEnd };
