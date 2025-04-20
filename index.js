const express = require("express");
const cors = require("cors");
require("dotenv").config();
const movieRoutes = require("./routes/movieRoutes");
const emailRoutes = require("./routes/emailRoutes");
const topMovieRoutes = require("./routes/topMovieRoutes");
const filterMoviesRoutes = require("./routes/filterMoviesRoutes");
const freshLinkRoutes = require("./routes/freshLinkRoutes");
const downloadRoutes = require("./routes/downloadRoutes");
const { PORT } = require("./config/serverConfig");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/movies", movieRoutes);
app.use("/api/filter_movies", filterMoviesRoutes);
app.use("/api", emailRoutes);
app.use("/api/top_rated_movies", topMovieRoutes);
app.use("/api/get-download-links", freshLinkRoutes);
app.use("/api", downloadRoutes);


app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
