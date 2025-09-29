const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const {
  register,
  login,
  uploadResume,
  getCurrentUser,
  deleteResume,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/upload-resume", authenticate, upload.single("resume"), uploadResume);
router.get("/me", authenticate, getCurrentUser);
router.delete("/delete-resume", authenticate, deleteResume);

module.exports = router;
