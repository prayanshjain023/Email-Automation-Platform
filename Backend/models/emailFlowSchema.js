// Import mongoose module to interact with MongoDB
const mongoose = require('mongoose');

// Define the schema for the EmailFlow model
const emailFlowSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, // User reference type
      ref: 'User', // References the User model
    },
    title: { 
      type: String, // The title of the email flow
      required: true, // This field is required
    },
    nodes: [{ 
      type: Object, // Stores an array of nodes in the flow (each node could represent an action, condition, etc.)
    }],
    edges: [{ 
      type: Object, // Stores an array of edges, representing connections between nodes
    }],
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Export the model for interacting with the email flows in the application
module.exports = mongoose.model('EmailFlow', emailFlowSchema);
