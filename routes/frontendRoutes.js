const express = require("express");
const { createFrontEnd } = require("../controllers/frontendController");

const router = express.Router();

router.post("/create", createFrontEnd);

module.exports = router;
