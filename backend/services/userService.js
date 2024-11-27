const User = require("../models/User");

// Get a user profile by ID
const getUserProfile = async (userId) => {
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    throw new Error("Error fetching user profile");
  }
};

// Update user profile
const updateUserProfile = async (userId, updatedData) => {
  try {
    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password");
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    throw new Error("Error updating user profile");
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
};
