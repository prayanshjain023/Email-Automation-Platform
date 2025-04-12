// Import the necessary modules
const express = require('express'); // Express framework to handle routing
const router = express.Router(); // Create a new router instance
const { getStats } = require('../controllers/statsController'); // Import the function to get stats
const { authUser } = require("../middleware/auth"); // Import the user authentication middleware

// Route to get statistics
// This route is protected by the authUser middleware, which ensures the user is authenticated
router.get('/all', authUser, getStats);

// Export the router to use in the main application
module.exports = router;
