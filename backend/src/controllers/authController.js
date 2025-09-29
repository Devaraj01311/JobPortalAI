const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { parseResume } = require("../helpers/resumeParser");

// REGISTER
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed, resume: "" });
    await user.save();

    res.json({ message: "User registered", userId: user._id });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, resume: user.resume },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// UPLOAD RESUME
const uploadResume = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const uploadsDir = path.join(__dirname, "../../uploads");

    // Delete old resume
    if (user.resume) {
      const oldPath = path.join(uploadsDir, user.resume);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    user.resume = req.file.filename;
    await user.save();

    // Parse resume
    const resumeText = await parseResume(req.file.filename);

    res.json({
      message: "Resume uploaded successfully",
      user,
      resumeText,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// GET CURRENT USER
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const resumeUrl = user.resume
      ? `${process.env.BACKEND_URL}/uploads/${user.resume}`
      : null;

    res.json({
      ...user._doc,
      resume: user.resume || null,
      resumeUrl,
    });
  } catch (err) {
    console.error("Get current user error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// DELETE RESUME
const deleteResume = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.resume) {
      const filePath = path.join(__dirname, "../../uploads", user.resume);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      user.resume = "";
      await user.save();
    }

    res.json({ message: "Resume deleted successfully", user });
  } catch (err) {
    console.error("Delete resume error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { register, login, uploadResume, getCurrentUser, deleteResume };
