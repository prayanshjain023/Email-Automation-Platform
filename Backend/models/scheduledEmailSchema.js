// Import mongoose module to work with MongoDB
const mongoose = require('mongoose');

// Define the schema for ScheduledEmail
const scheduledEmailSchema = new mongoose.Schema({
  userId: { // User who scheduled the email
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    ref: 'User', // Establishes the relationship with the User model
    required: true // This field is required
  },
  templateId: { // Template used for the scheduled email
    type: mongoose.Schema.Types.ObjectId, // Reference to the Template model
    ref: 'Template', // Establishes the relationship with the Template model
    required: true // This field is required
  },
  sendTime: { // The date and time the email is scheduled to be sent
    type: Date, // Store as a Date object
    required: true // This field is required
  },
  status: { // Status of the email (whether it's scheduled, sent, or failed)
    type: String,
    enum: ['scheduled', 'sent', 'failed'], // Enum to restrict the values
    default: 'scheduled' // Default value is 'scheduled'
  }
}, { timestamps: true }); // Add createdAt and updatedAt fields

// Export the model for ScheduledEmail to interact with it in the rest of the application
module.exports = mongoose.model('ScheduledEmail', scheduledEmailSchema);
