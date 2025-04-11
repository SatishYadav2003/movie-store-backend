const fs = require("fs");
const path = require("path");

const jsonFilePath = path.join(__dirname, "../compiled_movie_details.json");

const getTopMovies = (limit = 5) => {
  try {
    const data = fs.readFileSync(jsonFilePath, "utf8");
    const allMovies = JSON.parse(data);

    // You can sort based on some logic if needed, like rating, update date, etc.
    const topMovies = allMovies.slice(0, limit); // Just take first N for now

    return topMovies;
  } catch (error) {
    console.error("Error reading movie JSON file:", error);
    return [];
  }
};

module.exports = { getTopMovies };
