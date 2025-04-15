const { getTopMovies } = require("../models/topMovieModel");

const fetchTopMovies = (req, res) => {
  const topMovies = getTopMovies(10); // change the number if needed

  if (topMovies.length > 0) {
    return res.status(200).json(topMovies);
  } else {
    return res.status(404).json({ error: "No top movies found" });
  }
};

module.exports = { fetchTopMovies };
