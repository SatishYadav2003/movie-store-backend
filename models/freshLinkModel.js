const axios = require('axios');

// Model function to fetch the download link from the external service
const fetchDownloadLink = async (url) => {
  try {
    // Forward the request to the external service (onRender)
    // const response = await axios.get("https://latest-link.onrender.com/get-download-links", {
    //   params: { url: url }
    // });
    // const response = await axios.get("https://latest-link.onrender.com/get-download-links", {
    //   params: { url: url }
    // });
    const response = await axios.get("http://localhost:10000/get-download-links", {
      params: { url: url }
    });
    return response.data; // Return the response from the external service
  } catch (error) {
    throw new Error("Error fetching the download link: " + error.message);
  }
};

module.exports = { fetchDownloadLink };
