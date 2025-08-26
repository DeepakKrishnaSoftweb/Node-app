const express = require("express");

const router = express.Router();

const menus = require("./../models/menus");
const { findByIdAndUpdate } = require("../models/Person");

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newMenus = new menus(data);

    const response = await newMenus.save();
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await menus.find();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:menuName", async (req, res) => {
  try {
    const menuName = req.params.menuName;

    const data = await menus.find({ taste: menuName });
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/update/:menuId", async (req, res) => {
  try {
    const menuId = req.params.menuId;
    const updatedData = req.body;

    const response = await menus.findByIdAndUpdate(menuId, updatedData);

    if (!response) {
      console.log("Data not found");
      res.status(404).json({ error: "Data Not Found" });
    }
    console.log("Data Update");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/delete/:menuId", async (req, res) => {
  try {
    const menuId = req.params.menuId;
    const response = await menus.findByIdAndDelete(menuId);

    if (!response) {
      console.log("Data not found");
      res.status(404).json({ error: "Data not found" });
    }

    console.log("Data deleted successfully");
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server error");
  }
});

module.exports = router;
