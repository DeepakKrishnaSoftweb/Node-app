const express = require("express");
const upload = require("../middlewares/imageUploadMiddleware");
/// Import Employee JWT
const {
  jwtMiddleware,
  generateJwtToken,
} = require("../middlewares/jwtMiddleware");

const {
  createBackend,
  getBackend,
  getBackendById,
  updateBackend,
  deleteBackend,
  signInWithJWT,
  updateBackendUsingJWT,
  deleteBackendWithJWT,
  changePassword,
} = require("../controllers/backendController");
const router = express.Router();

router.post("/create", upload.single("image"), createBackend);
router.post("/signIn", signInWithJWT);
router.get("/getAll", getBackend);
router.get("/getById/:id", getBackendById);
router.put("/updateBackend/:id", upload.single("image"), updateBackend);
router.delete("/deleteBackend/:id", deleteBackend);
router.post("/changePassword", jwtMiddleware, changePassword);
router.put(
  "/updateBackendWithJWT",
  jwtMiddleware,
  upload.single("image"),
  updateBackendUsingJWT
);
router.delete("/deleteBackendWithJWT", jwtMiddleware, deleteBackendWithJWT);

module.exports = router;
