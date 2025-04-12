// Importing required Mongoose models
const EmailFlow = require('../models/emailFlowSchema');            // Model for email flows
const Template = require('../models/emailTemplate');               // Model for email templates
const ScheduledEmail = require('../models/scheduledEmailSchema'); // Model for scheduled/sent emails

// Controller function to fetch stats related to the logged-in user's account
const getStats = async (req, res) => {
  // Extract user ID from the authenticated request object
  const userId = req.user._id;

  try {
    // Count total number of email templates created by the user
    const templatesCount = await Template.countDocuments({ userId });

    // Count total number of email flows created by the user
    const flowsCount = await EmailFlow.countDocuments({ userId });

    // Count total number of emails scheduled/sent by the user
    const sentEmailsCount = await ScheduledEmail.countDocuments({ userId });

    // Return the stats in the response
    res.status(200).json({
      success: true,
      templates: templatesCount,
      flows: flowsCount,
      sentEmails: sentEmailsCount
    });
  } catch (error) {
    // Handle errors and send a 500 server error response
    console.error("Error fetching stats:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Exporting the getStats controller to be used in routes
module.exports = { getStats };
