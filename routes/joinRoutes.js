const express = require("express");

const router = express.Router();

const { getDropDown } = require("./../controllers/joinController");

router.get("/getDropDown", getDropDown);

module.exports = router;
