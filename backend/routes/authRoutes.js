const express = require("express");
const { signup, login } = require("../controllers/authController");
const router = express.Router();

// Middleware to validate signup and login data
const validateSignupData = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please provide all required fields" });
  }
  // Optionally, add further checks like valid email format or password strength here
  next();
};

const validateLoginData = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ msg: "Please provide both email and password" });
  }
  next();
};

// Signup Route
router.post("/signup", validateSignupData, signup);

// Login Route
router.post("/login", validateLoginData, login);

module.exports = router;
