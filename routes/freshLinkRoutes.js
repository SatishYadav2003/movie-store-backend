const express = require("express");
const router = express.Router();
const { getFreshLink } = require("../controllers/freshLinkController");

// Controller function to get download links from an external service
router.get("/", getFreshLink);

module.exports = router;
