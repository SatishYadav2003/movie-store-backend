const { fetchDownloadLink } = require('../models/freshLinkModel');

// Controller function to handle the request and send the download link to the frontend
const getFreshLink = async (req, res) => {
  const { url } = req.query;
  console.log(url)

  if (!url) {
    return res.status(400).json({ error: "URL query parameter is required" });
  }

  try {
    // Call the model to fetch the download link
    console.log("before fetching")
    const downloadLinkData = await fetchDownloadLink(url);
    console.log(downloadLinkData)

    // Send the response back to the frontend
    return res.json(downloadLinkData);
  } catch (error) {
    console.error("Error fetching download link:", error);
    return res.status(500).json({ error: "An error occurred while fetching the download links" });
  }
};

module.exports = { getFreshLink };
