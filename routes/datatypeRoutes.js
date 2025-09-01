const { createDataType } = require("./../controllers/datatypeController");

const express = require("express");

const router = express.Router();

router.post("/create", createDataType);

module.exports = router;
