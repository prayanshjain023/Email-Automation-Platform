// Import necessary modules
const mongoose = require('mongoose'); // Mongoose for MongoDB object modeling
const bcrypt = require('bcrypt'); // bcrypt for password hashing
const jwt = require('jsonwebtoken'); // jsonwebtoken for generating JWT tokens

// Define the user schema
const userSchema = new mongoose.Schema({
    fullName: { // User's full name object
        firstName: {
            type: String,
            required: [true, 'First name is required'], // First name is mandatory
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required'], // Last name is mandatory
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required'], // Email is mandatory
        unique: true, // Ensure that the email is unique
        trim: true, // Remove leading/trailing spaces
        lowercase: true, // Convert email to lowercase
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'] // Validate the email format using regex
    },
    password: {
        type: String,
        required: [true, 'Password is required'], // Password is mandatory
        select: false, // Don't return the password when querying users
    },
    emailTemplates: [ // Array to store user's email templates
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'EmailTemplate' // Reference to the 'EmailTemplate' model
        }
    ]
}, { timestamps: true }); // Add createdAt and updatedAt fields to track document changes

// Method to generate an authentication token (JWT)
userSchema.methods.generateAuthToken = function () {
    // Sign the token with the user's _id and secret, setting an expiry of 24 hours
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
      expiresIn: "24h", // Token expires in 24 hours
    });
};

// Middleware to hash the password before saving the user to the database
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) { // Check if password is modified (i.e., when creating or updating the password)
        // Hash the password using bcrypt with a salt rounds of 10
        this.password = await bcrypt.hash(this.password, 10);
    }
    next(); // Continue with the save operation
});

// Create and export the User model using the defined schema
const User = mongoose.model('User', userSchema);
module.exports = User; // Export the User model for use in other parts of the application
