const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const transportMail = async ({ to, subject, body }) => {
  await transporter.sendMail({
    from: `"FlowMail" <${process.env.MAIL_USER}>`,
    to,
    subject,
    html: body
  });
};

module.exports = transportMail;
