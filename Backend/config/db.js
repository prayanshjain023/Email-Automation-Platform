// Import Mongoose for MongoDB connection
const mongoose = require('mongoose');

// Function to connect to the MongoDB database
const connectDatabase = async () => {
    try {
        // Attempt to connect to MongoDB using the connection string from environment variables
        await mongoose.connect(process.env.MONGO_URI);

        // Log success message if connected
        console.log('Database connected successfully');
    } catch (error) {
        // Log error message if connection fails
        console.error('Database connection failed:', error.message);
    }
};

// Export the function so it can be used in your main server file
module.exports = connectDatabase;
