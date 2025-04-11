const express = require("express");
const router = express.Router();
const { fetchTopMovies } = require("../controllers/topMovieController");

router.get("/", fetchTopMovies);

module.exports = router;
