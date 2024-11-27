const express = require("express");
const {
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Validation middleware for updating profile data
const validateUpdateProfileData = (req, res, next) => {
  const { name, email } = req.body;

  // Ensure both name and email are provided
  if (!name || !email) {
    return res.status(400).json({ msg: "Please provide both name and email" });
  }

  // Optional: Validate email format
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ msg: "Please provide a valid email" });
  }

  next();
};
// Define Routes with Authentication Middleware
router.get("/profile", authMiddleware, getUserProfile); // Add authentication middleware
router.put(
  "/profile",
  authMiddleware,
  validateUpdateProfileData,
  updateUserProfile
); // Add authentication middleware

module.exports = router;
