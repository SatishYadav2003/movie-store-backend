const express = require("express");
const cors = require("cors");
require("dotenv").config();
const movieRoutes = require("./routes/movieRoutes");
const emailRoutes = require("./routes/emailRoutes");
const filterMoviesRoutes = require("./routes/filterMoviesRoutes");
const { PORT } = require("./config/serverConfig");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/movies", movieRoutes);
app.use("/api/filter_movies",filterMoviesRoutes);
app.use("/api", emailRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
