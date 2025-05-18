const fs = require("fs");
const path = require("path");

const jsonFilePath = path.join(__dirname, "../compiled_movie_details.json");

const getRandomMovies = (limit) => {
  try {
    const data = fs.readFileSync(jsonFilePath, "utf8");
    const allMovies = JSON.parse(data);

   
    for (let i = allMovies.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allMovies[i], allMovies[j]] = [allMovies[j], allMovies[i]];
    }

    // Return the first `limit` number of movies
    return allMovies.slice(0, limit);
  } catch (error) {
    console.error("Error reading movie JSON file:", error);
    return [];
  }
};

module.exports = { getRandomMovies };
