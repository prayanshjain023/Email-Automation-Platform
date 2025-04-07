const jwt = require("jsonwebtoken");
const blackListedModel = require("../models/blackListToken");
const User = require("../models/userSchema");

const authUser = async (req, res, next) => {
  try {

    const token =
      req.cookies?.token ||
      (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ") &&
        req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }


    const isBlacklisted = await blackListedModel.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ error: "Unauthorized: Token has been blacklisted" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication Error:", error.message);
    return res.status(401).json({ error: "Unauthorized: Invalid or expired token" }); // Make sure to return!
  }
};

module.exports = { authUser };
