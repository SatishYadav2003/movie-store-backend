const express = require("express");
const { filterMovies } = require("../controllers/filterMoviesController");

const router = express.Router();

router.get("/", filterMovies);

module.exports = router;
