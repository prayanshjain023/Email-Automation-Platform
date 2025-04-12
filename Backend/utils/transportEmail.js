// Importing the nodemailer module to send emails
const nodemailer = require('nodemailer');

// Create a transporter object using the Gmail service
const transporter = nodemailer.createTransport({
  service: 'gmail', // Using Gmail service to send emails
  auth: {
    user: process.env.MAIL_USER, // Your Gmail address (should be stored in environment variables)
    pass: process.env.MAIL_PASS  // Your Gmail app password (should be stored in environment variables)
  }
});

// Verify the transporter connection to the mail server
transporter.verify(function (error, success) {
  if (error) {
    // Log error if unable to connect to the email service
    console.error("Email Transport Error:", error);
  } else {
    // Log success if server is ready to send emails
    console.log("Server is ready to take emails 🚀");
  }
});

// Function to send email using the transporter
const transportMail = async ({ to, subject, html }) => {
  try {
    // Send an email with the specified parameters
    await transporter.sendMail({
      from: `"FlowMail" <${process.env.MAIL_USER}>`, // Sender email (FlowMail as the sender name)
      to,    // Recipient email address
      subject, // Subject of the email
      html // The body of the email (HTML content)
    });
    console.log("Email sent successfully!");
  } catch (error) {
    // Log any errors that occur during the email sending process
    console.error("Error sending email:", error);
  }
};

// Export the transportMail function for use in other parts of the application
module.exports = transportMail;
