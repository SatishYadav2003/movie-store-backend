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



const https = require("https");
const http = require("http");
const { URL } = require("url");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/movies", movieRoutes);
app.use("/api/filter_movies", filterMoviesRoutes);
app.use("/api", emailRoutes);
app.use("/api/top_rated_movies", topMovieRoutes);
app.use("/api/get-download-links", freshLinkRoutes);
app.use("/api/download", downloadRoutes);






app.get("/api/stream", (req, res) => {
  const encodedUrl = req.query.url;
  const referer = req.query.referer;
  const userAgent = req.query.ua;
  const cookie = req.query.cookie;

  if (!encodedUrl) {
    return res.status(400).json({ error: "Missing 'url' query parameter" });
  }

  const decodedUrl = Buffer.from(encodedUrl, "base64").toString("utf-8");

  try {
    const parsedUrl = new URL(decodedUrl);
    const protocol = parsedUrl.protocol === "https:" ? https : http;

    const options = {
      method: "GET",
      headers: {
        referer: referer || "",
        "user-agent": userAgent || "",
        cookie: cookie || "",
        range: req.headers.range || "bytes=0-"
      }
    };

    const streamRequest = protocol.get(decodedUrl, options, streamRes => {
      if (streamRes.statusCode === 200 || streamRes.statusCode === 206) {
        res.writeHead(streamRes.statusCode, {
          "Content-Type": streamRes.headers["content-type"] || "video/mp4",
          "Content-Length": streamRes.headers["content-length"],
          "Accept-Ranges": streamRes.headers["accept-ranges"] || "bytes",
          "Content-Range": streamRes.headers["content-range"] || undefined
        });
        streamRes.pipe(res);
      } else {
        res.status(streamRes.statusCode).json({ error: "Failed to stream video" });
      }
    });

    streamRequest.on("error", err => {
      console.error("Streaming error:", err);
      res.status(500).json({ error: "Internal streaming error" });
    });

  } catch (err) {
    console.error("URL decode error:", err);
    res.status(400).json({ error: "Invalid video URL" });
  }
});


app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
