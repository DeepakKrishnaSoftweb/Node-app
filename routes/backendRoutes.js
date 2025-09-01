const express = require("express");
const upload = require("../middlewares/imageUploadMiddleware");
const {
  createBackend,
  getBackend,
  getBackendById,
  updateBackend,
  deleteBackend,
  signInWithJWT,
} = require("../controllers/backendController");
const router = express.Router();

router.post("/create", upload.single("image"), createBackend);
router.get("/signIn", signInWithJWT);
router.get("/getAll", getBackend);
router.get("/getById/:id", getBackendById);
router.put("/updateBackend/:id", upload.single("image"), updateBackend);
router.delete("/deleteBackend/:id", deleteBackend);

module.exports = router;
