// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();
// const movieRoutes = require("./routes/movieRoutes");
// const emailRoutes = require("./routes/emailRoutes");
// const topMovieRoutes = require("./routes/topMovieRoutes");
// const filterMoviesRoutes = require("./routes/filterMoviesRoutes");
// const freshLinkRoutes = require("./routes/freshLinkRoutes");
// const { PORT } = require("./config/serverConfig");

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.get("/",(req,res)=>{
//   res.send("hello sir")
// })
// app.use("/api/movies", movieRoutes);
// app.use("/api/filter_movies",filterMoviesRoutes);
// app.use("/api", emailRoutes);
// app.use("/api/top_rated_movies",topMovieRoutes)
// app.use("/api/get-download-links", freshLinkRoutes);



// app.post("/download")

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Backend server running on http://localhost:${PORT}`);
// });


const express = require("express");
const cors = require("cors");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const movieRoutes = require("./routes/movieRoutes");
const emailRoutes = require("./routes/emailRoutes");
const topMovieRoutes = require("./routes/topMovieRoutes");
const filterMoviesRoutes = require("./routes/filterMoviesRoutes");
const freshLinkRoutes = require("./routes/freshLinkRoutes");
const { PORT } = require("./config/serverConfig");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/",(req,res)=>{
  res.send("hello sir")
});
app.use("/api/movies", movieRoutes);
app.use("/api/filter_movies", filterMoviesRoutes);
app.use("/api", emailRoutes);
app.use("/api/top_rated_movies", topMovieRoutes);
app.use("/api/get-download-links", freshLinkRoutes);

const atob = (str) => Buffer.from(str, 'base64').toString('utf-8');

app.get("/download", async (req, res) => {
  const { url, headers: encodedHeaders } = req.query;

  if (!url || !encodedHeaders) {
    return res.status(400).send("URL and headers are required.");
  }

  try {
    const customHeaders = JSON.parse(atob(encodedHeaders)); // decode headers

    const response = await axios({
      method: "get",
      url,
      headers: customHeaders,
      responseType: "stream",
    });
    const cleanFilename = path.basename(new URL(url).pathname);

    // Set download headers
    res.setHeader("Content-Type", response.headers["content-type"] || 'application/octet-stream');
    res.setHeader("Content-Length", response.headers["content-length"] || '');
    res.setHeader("Content-Disposition", `attachment; filename="${cleanFilename}"`);
   

    // Pipe file to client
    response.data.pipe(res);
  } catch (error) {
    console.error("Download error:", error.message);
    res.status(500).send("Download failed.");
  }
});



// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
