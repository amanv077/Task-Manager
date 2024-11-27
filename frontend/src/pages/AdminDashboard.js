import React, { useEffect, useState } from "react";
import { fetchTasks, createTask, deleteTask } from "../services/api";
import TeamMemberList from "../components/TeamMemberList";
import AdminTaskManager from "../components/AdminTaskManager";

const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
  });

  useEffect(() => {
    const getTasks = async () => {
      const data = await fetchTasks();
      setTasks(data);
    };
    getTasks();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const task = await createTask(newTask);
      setTasks([...tasks, task]);
      setNewTask({ title: "", description: "", dueDate: "", priority: "Low" });
    } catch (error) {
      console.error("Error creating task:", error);
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

  return (
    <div>
      <h1 className="text-2xl mb-4">Admin Dashboard</h1>

      {/* Create Task Form */}
      <form onSubmit={handleCreateTask} className="mb-6">
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <textarea
          placeholder="Task Description"
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
        <button type="submit" className="bg-green-500 text-white px-4 py-2">
          Create Task
        </button>
      </form>

      {/* Task List */}
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="border p-4 mb-2">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            <p>Priority: {task.priority}</p>
            <p>Status: {task.status}</p>
            <button
              onClick={() => handleDeleteTask(task._id)}
              className="bg-red-500 px-4 py-2 mt-2"
            >
              Delete Task
            </button>
          </li>
        ))}
      </ul>
      <AdminTaskManager
        onTaskAssign={(task) => console.log("Assigning task:", task)}
      />
      <TeamMemberList tasks={tasks} />
    </div>
  );
};

export default AdminDashboard;
