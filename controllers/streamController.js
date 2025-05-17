const http = require("http");
const https = require("https");

exports.streamVideo = (req, res) => {
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
};
