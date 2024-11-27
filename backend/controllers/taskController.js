const Task = require("../models/Task");
const User = require("../models/User");

// Create a Task
const createTask = async (req, res) => {
  const { title, description, dueDate, priority } = req.body;
  try {
    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      user: req.user.id,
    });

    await task.save();
    const user = await User.findById(req.user.id);
    user.tasks.push(task._id);
    await user.save();

    res.status(201).json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get User Tasks
const getUserTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Update Task Status
const updateTaskStatus = async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;
  try {
    let task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    if (task.user.toString() !== req.user.id)
      return res.status(403).json({ msg: "User not authorized" });

    task.status = status;
    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    if (task.user.toString() !== req.user.id)
      return res.status(403).json({ msg: "User not authorized" });

    await task.remove();
    res.json({ msg: "Task deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { createTask, getUserTasks, updateTaskStatus, deleteTask };
