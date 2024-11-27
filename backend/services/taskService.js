const Task = require("../models/Task");
const User = require("../models/User");

// Create a task and associate it with a user
const createTask = async (
  userId,
  { title, description, dueDate, priority }
) => {
  try {
    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      user: userId,
    });

    await task.save();

    // Add task reference to user document
    const user = await User.findById(userId);
    user.tasks.push(task._id);
    await user.save();

    return task;
  } catch (error) {
    throw new Error("Error creating task");
  }
};

// Get all tasks for a user
const getTasksByUser = async (userId) => {
  try {
    const tasks = await Task.find({ user: userId }).populate("user");
    return tasks;
  } catch (error) {
    throw new Error("Error fetching tasks");
  }
};

// Update a task's status
const updateTaskStatus = async (taskId, status) => {
  try {
    const task = await Task.findById(taskId);
    if (!task) throw new Error("Task not found");

    task.status = status;
    await task.save();

    return task;
  } catch (error) {
    throw new Error("Error updating task status");
  }
};

// Delete a task
const deleteTask = async (taskId) => {
  try {
    const task = await Task.findById(taskId);
    if (!task) throw new Error("Task not found");

    await task.remove();
    return { msg: "Task deleted successfully" };
  } catch (error) {
    throw new Error("Error deleting task");
  }
};

module.exports = {
  createTask,
  getTasksByUser,
  updateTaskStatus,
  deleteTask,
};
