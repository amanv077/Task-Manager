// config/cors.js
const corsOptions = {
  origin: "http://localhost:3000", // Allow frontend to make requests
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow cookies if needed
};

module.exports = corsOptions;
