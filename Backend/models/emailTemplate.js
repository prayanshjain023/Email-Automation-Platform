const mongoose = require('mongoose');

const emailTemplateSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: String,
  subject: String,
  body: String
}, { timestamps: true });

module.exports = mongoose.model('EmailTemplate', emailTemplateSchema);
