const { findMovieById } = require("../models/movieModel");

const getMovieById = (req, res) => {
    const movieId = encodeURIComponent(req.params.movie_id);
    const movie = findMovieById(movieId);

    if (movie) {
        return res.status(200).json(movie);
    } else {
        return res.status(404).json({ error: "Movie not found" });
    }
};

module.exports = { getMovieById };
