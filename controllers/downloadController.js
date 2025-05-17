// const axios = require("axios");
// const path = require("path");

// const atob = (str) => Buffer.from(str, 'base64').toString('utf-8');

// exports.downloadFile = async (req, res) => {
//     const { url, headers: encodedHeaders } = req.query;

//     if (!url || !encodedHeaders) {
//         return res.status(400).send("URL and headers are required.");
//     }

//     try {
//         const customHeaders = JSON.parse(atob(encodedHeaders));

//         const response = await axios({
//             method: "get",
//             url,
//             headers: customHeaders,
//             responseType: "stream",
//         });

//         res.setHeader("Content-Type", response.headers["content-type"] || 'application/octet-stream');
//         res.setHeader("Content-Length", response.headers["content-length"] || '');

//         const originalName = path.basename(new URL(url).pathname);
//         const ext = path.extname(originalName);
//         const nameWithoutExt = path.basename(originalName, ext);
//         const finalFileName = `${nameWithoutExt}-movie4u-rock${ext}`;

//         res.setHeader("Content-Disposition", `attachment; filename="${finalFileName}"`);

//         response.data.pipe(res);
//     } catch (error) {
//         console.error("Download error:", error.message);
//         res.status(500).send("Download failed.");
//     }
// };



const axios = require("axios");
const path  = require("path");

exports.downloadFile = async (req, res) => {
  const { url, headers: hdrParam } = req.query;

  if (!url || !hdrParam) {
    return res.status(400).send("URL and headers are required.");
  }

  let customHeaders;
  try {
    // decode the percent‐encoded JSON directly, no Base64
    customHeaders = JSON.parse(decodeURIComponent(hdrParam));
  } catch (err) {
    console.error("Header parse error:", err.message);
    return res.status(400).send("Malformed headers parameter.");
  }

  try {
    const response = await axios({
      method: "get",
      url,
      headers: customHeaders,
      responseType: "stream",
    });

    // forward content headers for the download
    res.setHeader("Content-Type", response.headers["content-type"] || "application/octet-stream");
    res.setHeader("Content-Length", response.headers["content-length"] || "");

    const originalName   = path.basename(new URL(url).pathname);
    const ext            = path.extname(originalName);
    const nameWithoutExt = path.basename(originalName, ext);
    const finalFileName  = `${nameWithoutExt}-movie4u-rock${ext}`;
    res.setHeader("Content-Disposition", `attachment; filename="${finalFileName}"`);

    response.data.pipe(res);
  } catch (error) {
    console.error("Download error:", error.message);
    res.status(500).send("Download failed.");
  }
};
