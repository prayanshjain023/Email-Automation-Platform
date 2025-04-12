// Import necessary modules
const express = require('express'); // Express framework to handle routing
const router = express.Router(); // Create a new router instance
const {
  createTemplate,
  getAllTemplates,
  updateTemplate,
  deleteTemplate,
  getTemplateById
} = require('../controllers/emailTemplateController'); // Import the controller functions for email template actions
const { authUser } = require('../middleware/auth'); // Import the user authentication middleware

// Route to create a new email template
// Handles POST requests to /create
// This route is protected by the authUser middleware, ensuring only authenticated users can create templates
router.post('/create', authUser, createTemplate); // Create template controller is invoked when a POST request is made to this route

// Route to get all email templates of the authenticated user
// Handles GET requests to /
// This route is protected by the authUser middleware, ensuring only authenticated users can access their templates
router.get('/', authUser, getAllTemplates); // Get all templates controller is invoked when a GET request is made to this route

// Route to update an email template by ID
// Handles PUT requests to /:id
// This route is protected by the authUser middleware, ensuring only authenticated users can update their templates
router.put('/:id', authUser, updateTemplate); // Update template controller is invoked when a PUT request is made to this route

// Route to delete an email template by ID
// Handles DELETE requests to /:id
// This route is protected by the authUser middleware, ensuring only authenticated users can delete their templates
router.delete('/:id', authUser, deleteTemplate); // Delete template controller is invoked when a DELETE request is made to this route

// Route to get a specific email template by ID
// Handles GET requests to /:id
// This route is protected by the authUser middleware, ensuring only authenticated users can access a specific template
router.get('/:id', authUser, getTemplateById); // Get template by ID controller is invoked when a GET request is made to this route

// Export the router to use in the main application
module.exports = router;
