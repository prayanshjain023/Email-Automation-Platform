const EmailFlow = require('../models/emailFlowSchema');
const Template = require('../models/emailTemplate');
const ScheduledEmail = require('../models/scheduledEmailSchema');

const getStats = async (req, res) => {
  const userId = req.user._id;

  try {
    const templatesCount = await Template.countDocuments({ userId });
    const flowsCount = await EmailFlow.countDocuments({ userId });
    const sentEmailsCount = await ScheduledEmail.countDocuments({ userId });

    res.status(200).json({
      success: true,
      templates: templatesCount,
      flows: flowsCount,
      sentEmails: sentEmailsCount
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { getStats };
