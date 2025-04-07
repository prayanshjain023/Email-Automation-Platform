const EmailTemplate = require('../models/emailTemplate');
const transportMail = require('../utils/transportEmail');

const defineSendEmailJob = (agenda) => {
  agenda.define('send-email', async (job) => {
    const { to, templateId } = job.attrs.data;

    const template = await EmailTemplate.findById(templateId);
    if (!template) return;

    await transportMail({
      to,
      subject: template.subject,
      body: template.body
    });

    console.log(`📧 Email sent to ${to}`);
  });
};

module.exports = defineSendEmailJob;
