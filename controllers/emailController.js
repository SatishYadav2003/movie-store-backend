const transporter = require("../config/mailConfig");
const generateEmailTemplate = require("../views/emailTemplate");

exports.sendMovieRequestEmail = async (req, res) => {
    const { senderName, senderEmail, movieName, movieLanguage, reason } = req.body;

    if (!senderEmail || !movieName || !movieLanguage) {
        return res.status(400).json({ error: "Missing required fields." });
    }

    const mailOptions = {
        from: process.env.ADMIN_EMAIL,
        replyTo: senderEmail,
        to: process.env.ADMIN_EMAIL,
        subject: `🎬 New Movie Request: ${movieName}`,
        html: generateEmailTemplate(senderName, senderEmail, movieName, movieLanguage, reason),
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error("Email sending error:", error);
        res.status(500).json({ error: "Failed to send email." });
    }
};
