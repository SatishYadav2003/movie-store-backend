const generateEmailTemplate = (senderName, senderEmail, movieName, movieLanguage, reason) => {
  return `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px; text-align: center;">
      <div style="max-width: 600px; background: white; border-radius: 12px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); overflow: hidden;">
        
        <!-- Header Section with Gradient -->
        <div style="background: linear-gradient(90deg, #2ecc71, #27ae60); color: white; padding: 20px; text-align: center;">
          <h2 style="margin: 0; font-size: 24px; font-weight: bold;">🎬 Movie Request Received</h2>
        </div>
        
        <!-- Body Content -->
        <div style="padding: 25px; color: #333; text-align: left;">
          <p style="font-size: 18px; font-weight: bold;">Hello Admin,</p>
          <p style="font-size: 16px;">A new movie request has been submitted. Here are the details:</p>
          
          <!-- Request Details Box -->
          <div style="background: #ecf9f1; padding: 18px; border-radius: 8px; margin: 15px 0; border-left: 5px solid #27ae60;">
            <p><strong style="color: #27ae60;">🎤 Requested By:</strong> ${senderName}</p>
            <p><strong style="color: #27ae60;">📩 Requester Email:</strong> <a href="mailto:${senderEmail}" style="color: #2980b9; text-decoration: none;">${senderEmail}</a></p>
            <p><strong style="color: #27ae60;">🎥 Movie Name:</strong> ${movieName}</p>
            <p><strong style="color: #27ae60;">🗣 Language:</strong> ${movieLanguage}</p>
            ${reason ? `<p><strong style="color: #27ae60;">📝 Reason:</strong> ${reason}</p>` : ""}
          </div>

        </div>

      </div>
    </div>
  `;
};

module.exports = generateEmailTemplate;
