// Load environment variables from .env file (like MONGO_URI)
require('dotenv').config(); // 👈 This loads the .env file

// Import required modules
const Agenda = require('agenda');
const mongoose = require('mongoose');

// Create a new Agenda instance for job scheduling
const agenda = new Agenda({
  db: {
    address: process.env.MONGO_URI, // MongoDB connection string from .env
    collection: 'agendaJobs',       // Collection name to store jobs in MongoDB
  },
  processEvery: '1 minute',         // Interval to check and process scheduled jobs
  maxConcurrency: 20,               // Max number of jobs Agenda will process concurrently
});

// Export the configured Agenda instance so it can be used in other files
module.exports = agenda;
