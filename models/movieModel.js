const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "../compiled_movie_details.json");

const getMovies = () => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading or parsing JSON:", error);
    return [];
  }
};

const findMovieById = (movieId) => {
  const movies = getMovies();
  return movies.find((movie) => decodeURIComponent(movie.movie_id) === movieId);
};

module.exports = { getMovies, findMovieById };
