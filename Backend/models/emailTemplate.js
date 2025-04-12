// Import mongoose module to work with MongoDB
const mongoose = require('mongoose');

// Define the schema for EmailTemplate
const emailTemplateSchema = new mongoose.Schema({
  userId: { // User who owns the email template
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    ref: 'User', // Establishes the relationship with the User model
    required: true // This field is required
  },
  title: { // The title of the email template
    type: String, // String type for the title
    required: true // You can make this field required if needed
  },
  subject: { // Subject line of the email template
    type: String, // String type for the subject
    required: true // You can make this field required if needed
  },
  body: { // Body content of the email template (HTML, Text, etc.)
    type: String, // String type for the body content
    required: true // You can make this field required if needed
  }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Export the model for EmailTemplate to interact with it in the rest of the application
module.exports = mongoose.model('EmailTemplate', emailTemplateSchema);
