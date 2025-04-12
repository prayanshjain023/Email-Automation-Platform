const express = require('express');
const cors = require('cors'); 
const cookieParser = require('cookie-parser'); 
const dotenv = require('dotenv');
const connectDB = require('./config/db.js'); 
const agenda = require('./config/agenda.js');
const defineSendEmailJob = require('./jobs/sendEmail.js');

// Create an Express app
const app = express();

// Load environment variables from .env file
dotenv.config(); 

// Get the port number from environment variables
const port = process.env.PORT

// Import route handlers
const userRoutes = require('./routes/userRoutes.js');
const emailFlowRoutes = require('./routes/emailFlowRoutes.js');
const emailTemplateRoutes = require('./routes/emailTemplateRoutes.js');
const statsRoutes = require('./routes/statsRoutes.js'); 

// Middleware to enable Cross-Origin Resource Sharing (CORS)
// Allow requests from the specified origin and allow credentials (cookies)
app.use(cors({
  origin: 'http://localhost:5173', // Must be a specific origin, not '*'
  credentials: true,
}));

// Middleware to parse cookies from requests
app.use(cookieParser());

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// Middleware to parse incoming URL-encoded request bodies (form data)
app.use(express.urlencoded({ extended: true }));

// Define API routes
app.use('/api/user', userRoutes); // User routes for authentication and profile
app.use('/api/flows', emailFlowRoutes); // Routes for handling email flows
app.use('/api/templates', emailTemplateRoutes); // Routes for handling email templates
app.use('/api/stats', statsRoutes); // Routes for fetching stats 

// Agenda job scheduler setup
agenda.on('ready', () => {
  console.log('Agenda is ready!');
  agenda.start(); // Start the agenda job scheduler once it's ready
});

// Define the email sending job
defineSendEmailJob(agenda);

// Catch-all route for undefined paths (404 error)
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

// Start the server and connect to the database
const startServer = async () => {
  try {
    // Connect to the MongoDB database
    await connectDB(); 
    
    // Start the Express server and listen on the specified port
    app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  } catch (error) {
    // If there's an error while starting the server, log it and exit the process
    console.error("Server failed to start:", error.message);
    process.exit(1); 
  }
};

// Call the function to start the server
startServer();
