const axios = require("axios");
const path = require("path");

const atob = (str) => Buffer.from(str, 'base64').toString('utf-8');

exports.downloadFile = async (req, res) => {
    const { url, headers: encodedHeaders } = req.query;

    if (!url || !encodedHeaders) {
        return res.status(400).send("URL and headers are required.");
    }

    try {
        const customHeaders = JSON.parse(atob(encodedHeaders));

        const response = await axios({
            method: "get",
            url,
            headers: customHeaders,
            responseType: "stream",
        });

        res.setHeader("Content-Type", response.headers["content-type"] || 'application/octet-stream');
        res.setHeader("Content-Length", response.headers["content-length"] || '');

        const originalName = path.basename(new URL(url).pathname);
        const ext = path.extname(originalName);
        const nameWithoutExt = path.basename(originalName, ext);
        const finalFileName = `${nameWithoutExt}-movie4u-rock${ext}`;

        res.setHeader("Content-Disposition", `attachment; filename="${finalFileName}"`);

        response.data.pipe(res);
    } catch (error) {
        console.error("Download error:", error.message);
        res.status(500).send("Download failed.");
    }
};
