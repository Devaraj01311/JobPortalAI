const express = require("express");
const cors = require("cors");
const connectDB = require("../src/config/Db");
require("dotenv").config();
const path = require("path");


const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/jobs", require("./routes/jobs"));



// Serve static files for resumes
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

app.get("/", (req, res) => {
  res.send("server is running");
});

module.exports = app;
