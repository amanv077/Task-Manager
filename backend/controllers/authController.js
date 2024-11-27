const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User Signup
const signup = async (req, res) => {
  const { name, email, password, role } = req.body; // Include role in the request body

  // Basic password validation (minimum length, etc.)
  if (!password || password.length < 6) {
    return res
      .status(400)
      .json({ msg: "Password must be at least 6 characters long" });
  }

  // Validate role (only allow 'admin' or 'user')
  if (!role || !["admin", "user"].includes(role)) {
    return res.status(400).json({ msg: "Invalid role" });
  }

  try {
    // Check if the user already exists by email
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create a new user with the role
    user = new User({
      name,
      email,
      // password: await bcrypt.hash(password, 10), // Hash password
      password,
      role, // Assign role
    });

    // Save the user to the database
    await user.save();

    // Generate a JWT token, including role in the payload
    const payload = { user: { id: user.id, role: user.role } }; // Add role to payload
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h", // Adjust token expiration as needed
    });

    res.json({ token });
  } catch (err) {
    console.error("Error during signup:", err.message);
    res.status(500).send("Server Error");
  }
};

// User Login
const login = async (req, res) => {
  const { email, password } = req.body;

  // Check if the email and password were provided
  if (!email || !password) {
    return res
      .status(400)
      .json({ msg: "Please provide both email and password" });
  }

  try {
    // Find user by email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Compare entered password with hashed password in DB
    // const isMatch = await bcrypt.compare(password, user.password);
    // console.log({ isMatch, userPwd: user.password, password });
    // if (!isMatch) {
    //   return res.status(400).json({ msg: "Invalid credentials" });
    // }
    if (password !== user.password) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate a JWT token, including role in the payload
    const payload = { user: { id: user.id, role: user.role } }; // Add role to payload
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h", // Adjust token expiration as needed
    });

    res.json({ token });
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { signup, login };
