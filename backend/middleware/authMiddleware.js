const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  // Retrieve token from Authorization header
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // If no token, return error
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    // Verify token and decode user information
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user in the database
    const user = await User.findById(decoded.user.id).select("-password");

    // If user is not found
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Attach user data to the request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    console.error("Auth Error: ", err.message);

    // Handle token expiration error explicitly
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ msg: "Token has expired, please log in again" });
    }

    // Handle other JWT verification errors
    return res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = authMiddleware;
