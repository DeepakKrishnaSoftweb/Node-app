/// Define multer (for upload files)
const multer = require("multer");

///Setup multer to store files in upload folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const suffix = Date.now();

    cb(null, suffix + "-" + file.originalname);
  },
});

/// file filter (optional)
/*const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images allowed!"), false);
  }
}; */

const upload = multer({ storage: storage });

module.exports = upload;
