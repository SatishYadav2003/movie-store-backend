const fs = require("fs");
const path = require("path");

const jsonFilePath = path.join(__dirname, "../compiled_movie_details.json");

const getTopMovies = (limit) => {
  try {
    const data = fs.readFileSync(jsonFilePath, "utf8");
    const allMovies = JSON.parse(data);

    const parsedMovies = allMovies.map((movie) => {
      const ratingStr = movie.Rating?.trim();
      const rating = parseFloat(ratingStr);

      return {
        ...movie,
        numericRating: isNaN(rating) ? 0 : rating,
      };
    });

    const sortedMovies = parsedMovies.sort(
      (a, b) => b.numericRating - a.numericRating
    );

    return sortedMovies.slice(0, limit);
  } catch (error) {
    console.error("Error reading movie JSON file:", error);
    return [];
  }
};

module.exports = { getTopMovies };
