import React, { useEffect, useState } from "react";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  fetchUsers,
  assignTaskToUser,
} from "../services/api";

const AdminTaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
  });
  const [editingTask, setEditingTask] = useState(null);
  const [assigningTask, setAssigningTask] = useState(null);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    const loadTasksAndUsers = async () => {
      try {
        const [fetchedTasks, fetchedUsers] = await Promise.all([
          fetchTasks(),
          fetchUsers(),
        ]);
        setTasks(fetchedTasks);
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error loading tasks and users:", error);
      }
    };
    loadTasksAndUsers();
  }, []);

  const handleCreateTask = async () => {
    try {
      const createdTask = await createTask(newTask);
      setTasks([...tasks, createdTask]);
      setNewTask({ title: "", description: "", dueDate: "", priority: "Low" });
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleUpdateTask = async () => {
    try {
      const updatedTask = await updateTask(editingTask._id, editingTask);
      setTasks(
        tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
      );
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleAssignTask = async () => {
    try {
      if (assigningTask && selectedUser) {
        await assignTaskToUser(assigningTask._id, selectedUser);
        setAssigningTask(null);
        setSelectedUser("");
        alert("Task assigned successfully.");
      }
    } catch (error) {
      console.error("Error assigning task:", error);
      alert("Failed to assign task.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Admin Task Manager</h2>
      {/* Create Task Section */}
      <div className="mb-4">
        <h3>Create New Task</h3>
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <textarea
          placeholder="Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          className="border p-2 mb-2 w-full"
        />
        <input
          type="date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <select
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
          className="border p-2 mb-2 w-full"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button
          onClick={handleCreateTask}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Task
        </button>
      </div>

      {/* Existing Tasks Section */}
      <div className="mt-4">
        <h3>Existing Tasks</h3>
        {tasks.map((task) => (
          <div key={task._id} className="border p-4 mb-2">
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            <p>Priority: {task.priority}</p>
            <button
              onClick={() => setEditingTask(task)}
              className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteTask(task._id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
            <button
              onClick={() => setAssigningTask(task)}
              className="bg-green-500 text-white px-2 py-1 ml-2 rounded"
            >
              Assign Task
            </button>
          </div>
        ))}
      </div>

      {/* Edit Task Section */}
      {editingTask && (
        <div className="mt-4">
          <h3>Edit Task</h3>
          <input
            type="text"
            value={editingTask.title}
            onChange={(e) =>
              setEditingTask({ ...editingTask, title: e.target.value })
            }
            className="border p-2 mb-2 w-full"
          />
          <textarea
            value={editingTask.description}
            onChange={(e) =>
              setEditingTask({ ...editingTask, description: e.target.value })
            }
            className="border p-2 mb-2 w-full"
          />
          <input
            type="date"
            value={editingTask.dueDate}
            onChange={(e) =>
              setEditingTask({ ...editingTask, dueDate: e.target.value })
            }
            className="border p-2 mb-2 w-full"
          />
          <select
            value={editingTask.priority}
            onChange={(e) =>
              setEditingTask({ ...editingTask, priority: e.target.value })
            }
            className="border p-2 mb-2 w-full"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button
            onClick={handleUpdateTask}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Update Task
          </button>
        </div>
      )}

      {/* Assign Task Section */}
      {assigningTask && (
        <div className="mt-4">
          <h3>Assign Task: {assigningTask.title}</h3>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="border p-2 mb-2 w-full"
          >
            <option value="">Select a User</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleAssignTask}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Assign
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminTaskManager;
