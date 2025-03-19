const fs = require("fs");
const path = require("path");

const jsonFilePath = path.join(__dirname, "../compiled_movie_details.json");

const getMovies = () => {
  try {
    const data = fs.readFileSync(jsonFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading movie JSON file:", error);
    return [];
  }
};

module.exports = { getMovies };