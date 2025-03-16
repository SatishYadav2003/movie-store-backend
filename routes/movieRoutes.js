const express = require("express");
const router = express.Router();
const { getMovieById } = require("../controllers/movieController");

router.get("/:movie_id", getMovieById);

module.exports = router;
