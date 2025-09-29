const fs = require("fs");
const path = require("path");
const pdf = require("pdf-parse");

const parseResume = async (fileName) => {
  try {
    // Resolve path outside src
    const absolutePath = path.join(__dirname, "../../uploads", path.basename(fileName));

    if (!fs.existsSync(absolutePath)) {
      console.error("Resume file not found for parsing:", absolutePath);
      return "";
    }

    const dataBuffer = fs.readFileSync(absolutePath);
    const data = await pdf(dataBuffer);
    return data.text;
  } catch (err) {
    console.error("Error parsing PDF:", err);
    return "";
  }
};

module.exports = { parseResume };
