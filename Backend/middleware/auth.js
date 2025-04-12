// Import dependencies
const jwt = require("jsonwebtoken");                         // For verifying JWT tokens
const blackListedModel = require("../models/blackListToken"); // Model to store blacklisted tokens (e.g., after logout)
const User = require("../models/userSchema");                // User model to fetch authenticated user data

// Middleware to authenticate users using JWT
const authUser = async (req, res, next) => {
  try {
    // Get token from cookie or Authorization header (Bearer <token>)
    const token =
      req.cookies?.token ||
      (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ") &&
        req.headers.authorization.split(" ")[1]);

    // If token is not found, deny access
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    // Check if the token has been blacklisted (e.g., during logout)
    const isBlacklisted = await blackListedModel.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ error: "Unauthorized: Token has been blacklisted" });
    }

    // Verify the token using the JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user associated with the token, excluding the password field
    const user = await User.findById(decoded._id).select("-password");

    // If user is not found, deny access
    if (!user) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    // Attach user object to request for use in subsequent middleware/controllers
    req.user = user;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Authentication Error:", error.message);

    // Handle invalid, expired, or malformed token
    return res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
  }
};

// Export the middleware
module.exports = { authUser };
