const ScheduledEmail = require('../models/scheduledEmailSchema');

const scheduleEmail = async ({ userId, flowId, templateId, sendTo, sendTime }) => {
  await ScheduledEmail.create({
    userId,
    flowId,
    templateId,
    sendTo,
    sendTime,
    status: 'scheduled'
  });
};

module.exports = { scheduleEmail };
