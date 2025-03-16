const express = require("express");
const cors = require("cors");
require("dotenv").config();
const movieRoutes = require("./routes/movieRoutes");
const { PORT } = require("./config/serverConfig");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/movies", movieRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
