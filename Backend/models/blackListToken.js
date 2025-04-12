// Import mongoose module to work with MongoDB
const mongoose = require("mongoose");

// Define the schema for BlackListedToken
const blackListedTokenSchema = new mongoose.Schema(
  {
    token: { // The token that is blacklisted
      type: String, // The token is stored as a string
      required: true, // This field is required
      unique: true, // Prevent duplicate tokens from being added
    },
    createdAt: { // Timestamp for when the token was blacklisted
      type: Date, // Date type to store the timestamp
      default: Date.now, // Default value is the current date/time
      expires: 86400, // TTL (Time To Live) index: Token will expire after 24 hours (86400 seconds)
    },
  },
);

// Export the model for BlackListedToken to interact with it in the rest of the application
module.exports = mongoose.model("BlackListedToken", blackListedTokenSchema);
