const fs = require("fs");
const path = require("path");

const jsonFilePath = path.join(__dirname, "../compiled_movie_details.json");

const getTopMovies = (limit = 5) => {
  try {
    const data = fs.readFileSync(jsonFilePath, "utf8");
    const allMovies = JSON.parse(data);

    // Parse the rating as a float, if it's "N/A", assign 0
    const moviesWithRatings = allMovies.map(movie => ({
      ...movie,
      Rating: movie.Rating === "N/A" ? 0 : parseFloat(movie.Rating)
    }));

    // Sort the movies by rating in descending order
    const sortedMovies = moviesWithRatings.sort((a, b) => b.Rating - a.Rating);

    // Get the top movies
    const topMovies = sortedMovies.slice(0, limit);

    return topMovies;
  } catch (error) {
    console.error("Error reading movie JSON file:", error);
    return [];
  }
};

module.exports = { getTopMovies };
