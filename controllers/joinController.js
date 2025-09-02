const { FrontEnd, BackEnd, DataType } = require("../models/join");

getDropDown = async (req, res) => {
  try {
    const result = await FrontEnd.findAll({
      include: [
        {
          model: BackEnd,
          attributes: ["name"], // backend name only
          include: [
            {
              model: DataType,
              attributes: ["name"], // datatype name only
            },
          ],
        },
      ],
      attributes: ["name"], // frontend name only
    });

    console.log("Result :", result);

    // const data1 = result.flatMap((r) =>
    //   r.BackEnds.map((b) => ({
    //     frontend: r.name,
    //     backend: b.name,
    //   }))
    // );

    //console.log("Data :", data1);

    res.status(200).json({
      sucess: true,
      message: "Data fetched successfully",
      frontEnds: result,
    });
  } catch (err) {
    console.log("Error : ", err);
    /// 500 Internal Server Error → Something broke on the server.
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

module.exports = { getDropDown };
