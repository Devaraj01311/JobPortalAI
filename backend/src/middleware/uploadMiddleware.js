const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Save uploads outside 'src', directly in 'backend/uploads'
const uploadDir = path.join(__dirname, "../../uploads"); 

// Create folder if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(`Uploads folder created at: ${uploadDir}`);
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });
module.exports = upload;
