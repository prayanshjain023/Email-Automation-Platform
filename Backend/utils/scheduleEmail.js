const ScheduledEmail = require('../models/scheduledEmailSchema');

const scheduleEmail = async ({ userId, flowId, templateId, sendTo, scheduledTime }) => {
  await ScheduledEmail.create({
    userId,
    flowId,
    templateId,
    sendTo,
    scheduledTime,
    status: 'scheduled'
  });
};

module.exports = { scheduleEmail };
