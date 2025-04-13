const express = require("express");

const { getFreshLink } = require('../controllers/freshLinkController')
const router = express.Router();


// Controller function to get download links from an external service
router.get("/", getFreshLink);

module.exports = router;
