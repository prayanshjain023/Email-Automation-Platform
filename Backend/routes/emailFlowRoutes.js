// Import necessary modules
const express = require('express'); // Express framework to handle routing
const router = express.Router(); // Create a new router instance
const { 
  createFlow, 
  getFlows, 
  getFlowById, 
  deleteFlow, 
  runFlow, 
  updateFlow 
} = require('../controllers/emailFlowController'); // Import the controller functions for email flow actions
const { authUser } = require('../middleware/auth'); // Import the user authentication middleware

// Route to create a new email flow
// Handles POST requests to /create
// This route is protected by the authUser middleware, ensuring only authenticated users can create email flows
router.post('/create', authUser, createFlow); // createFlow controller is invoked when a POST request is made to this route

// Route to update an existing email flow by ID
// Handles PUT requests to /:id
// This route is protected by the authUser middleware, ensuring only authenticated users can update their email flows
router.put('/:id', authUser, updateFlow); // updateFlow controller is invoked when a PUT request is made to this route

// Route to get all email flows for the authenticated user
// Handles GET requests to /
// This route is protected by the authUser middleware, ensuring only authenticated users can access their email flows
router.get('/', authUser, getFlows); // getFlows controller is invoked when a GET request is made to this route

// Route to get a specific email flow by ID
// Handles GET requests to /:id
// This route is protected by the authUser middleware, ensuring only authenticated users can access a specific email flow
router.get('/:id', authUser, getFlowById); // getFlowById controller is invoked when a GET request is made to this route

// Route to delete an email flow by ID
// Handles DELETE requests to /delete/:id
// This route is protected by the authUser middleware, ensuring only authenticated users can delete their email flows
router.delete('/delete/:id', authUser, deleteFlow); // deleteFlow controller is invoked when a DELETE request is made to this route

// Route to run an email flow (i.e., trigger the flow to start sending emails)
// Handles POST requests to /runflow
// This route is protected by the authUser middleware, ensuring only authenticated users can run their email flows
router.post('/runflow', authUser, runFlow); // runFlow controller is invoked when a POST request is made to this route

// Export the router to use in the main application
module.exports = router;
