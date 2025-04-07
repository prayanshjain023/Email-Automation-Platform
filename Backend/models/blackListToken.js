const mongoose = require("mongoose");

const blackListedTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true, // Prevent duplicate entries
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 86400, // TTL index (24 hours in seconds)
    },
  },
);

module.exports = mongoose.model("BlackListedToken", blackListedTokenSchema);
