const express = require("express");
const { sendMovieRequestEmail } = require("../controllers/emailController");

const router = express.Router();

router.post("/send-request", sendMovieRequestEmail);

module.exports = router;
