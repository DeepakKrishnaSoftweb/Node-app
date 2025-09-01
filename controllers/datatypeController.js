const Datatype = require("./../models/datatype");

/// Create DataType Method
const createDataType = async (req, res) => {
  try {
    //const { name } = req.body;
    //const newDataType = await Datatype.create({ name });
    const data = req.body;
    const newDataType = await Datatype.create(data);
    res.status(201).json({
      success: true,
      message: "Datatype data added successfully",
      data: newDataType,
    });
  } catch (err) {
    console.log("Error :", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { createDataType };
