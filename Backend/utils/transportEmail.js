const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

transporter.verify(function (error, success) {
  if (error) {
    console.error("Email Transport Error:", error);
  } else {
    console.log("Server is ready to take emails 🚀");
  }
});

const transportMail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: `"FlowMail" <${process.env.MAIL_USER}>`,
    to,
    subject,
    html
  });
};

module.exports = transportMail;
