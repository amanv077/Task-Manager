// Centralized error handler
const errorHandler = (err, req, res, next) => {
  console.error(err);
  if (err.message) {
    return res.status(500).json({ msg: err.message });
  } else {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = errorHandler;
