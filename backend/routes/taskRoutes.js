const express = require("express");
const {
  createTask,
  getUserTasks,
  updateTaskStatus,
  deleteTask,
} = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const Task = require("../models/Task");

// Validation middleware for task creation and updating
const validateTaskData = (req, res, next) => {
  const { title, description, dueDate, status, priority, assignedTo } =
    req.body;

  if (!title || !description || !dueDate || !status || !priority) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  // Additional validation for dueDate and other fields can be added here
  next();
};

// Create a new task
router.post("/", authMiddleware, validateTaskData, createTask);

// Get all tasks for a user
router.get("/user", authMiddleware, getUserTasks);

// Update task status (status update only)
router.put("/:taskId/status", authMiddleware, updateTaskStatus);

// Delete a task by ID
router.delete("/:taskId", authMiddleware, deleteTask);

// Get a specific task by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.error("Error fetching task by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a specific task (full update for task properties)
router.put("/:id", authMiddleware, validateTaskData, async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, dueDate, status, priority, assignedTo } =
      req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, dueDate, status, priority, assignedTo },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
