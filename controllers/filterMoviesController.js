const {getMovies} = require("../models/filterMoviesModel")

const filterMovies = (req, res) => {
  try {
    const movies = getMovies();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
};

module.exports = { filterMovies };
