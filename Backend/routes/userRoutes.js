const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { register, login, getUserProfile, logout } = require("../controllers/userController");
const { authUser } = require("../middleware/auth");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email format"),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("fullName.lastName")
      .isLength({ min: 3 })
      .withMessage("Last name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  register
);

router.post("/login",[
  body("email").isEmail().withMessage("Invalid email format"),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
], login);

router.get("/profile", authUser, getUserProfile);
router.get("/logout", authUser, logout);

module.exports = router;
