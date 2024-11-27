const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");
// const errorHandler = require("./utils/errorHandler");
require("dotenv").config();

const app = express();

// CORS Configuration
const corsOptions = require("./config/cors");
app.use(cors(corsOptions)); // Apply CORS settings globally

// Connect to Database
connectDB();

// Middleware
app.use(express.json()); // Body parser for JSON requests

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

// Error Handling Middleware
// app.use(errorHandler);

module.exports = app;
