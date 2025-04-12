// Import the ScheduledEmail model to interact with the scheduled email database
const ScheduledEmail = require('../models/scheduledEmailSchema');

// Function to schedule an email
const scheduleEmail = async ({ userId, flowId, templateId, sendTo, sendTime }) => {
  try {
    // Create a new scheduled email entry in the database
    await ScheduledEmail.create({
      userId,           // The user who is scheduling the email
      flowId,           // The flow in which this email is a part of
      templateId,       // The template that will be used for this email
      sendTo,           // The recipient's email address
      sendTime,         // The time when the email should be sent
      status: 'scheduled' // Initial status set to 'scheduled'
    });

  } catch (error) {
    // Handle any errors that may occur while scheduling the email
    console.error("Error scheduling email:", error);
    throw new Error("Failed to schedule email");
  }
};

// Export the scheduleEmail function to be used in other parts of the application
module.exports = { scheduleEmail };
