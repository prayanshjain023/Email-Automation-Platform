// Import necessary modules
const express = require("express"); // Express framework to handle routing
const router = express.Router(); // Create a new router instance
const { body } = require("express-validator"); // For input validation
const { register, login, getUserProfile, logout } = require("../controllers/userController"); // Import the controller functions for user actions
const { authUser } = require("../middleware/auth"); // Import the user authentication middleware

// Route to register a new user
// Handles POST requests to /register
router.post("/register", register); // Register controller is invoked when a POST request is made to this route

// Route to login a user
// Handles POST requests to /login
router.post("/login", login); // Login controller is invoked when a POST request is made to this route

// Route to get the user profile
// Handles GET requests to /profile
// This route is protected by the authUser middleware, which ensures that only authenticated users can access their profile
router.get("/profile", authUser, getUserProfile); // Profile controller is invoked when a GET request is made to this route

// Route to logout the user
// Handles GET requests to /logout
// This route is also protected by the authUser middleware to ensure the user is logged in before logging out
router.get("/logout", authUser, logout); // Logout controller is invoked when a GET request is made to this route

// Export the router to use in the main application
module.exports = router;
