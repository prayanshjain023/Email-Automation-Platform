const mongoose = require('mongoose');

const emailFlowSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    nodes: [{ type: Object }],
    edges: [{ type: Object }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('EmailFlow', emailFlowSchema);
