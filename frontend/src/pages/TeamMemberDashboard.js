import React, { useEffect, useState } from "react";
import { fetchTasks, updateTaskStatus } from "../services/api";

const TeamMemberDashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const data = await fetchTasks();
      setTasks(data.filter((task) => task.assignedTo === "me")); // Filter tasks assigned to the user
    };
    getTasks();
  }, []);

  const handleStatusChange = async (taskId, status) => {
    try {
      const updatedTask = await updateTaskStatus(taskId, status);
      setTasks(tasks.map((task) => (task._id === taskId ? updatedTask : task)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">My Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="border p-4 mb-2">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            <p>Status: {task.status}</p>
            <button
              onClick={() => handleStatusChange(task._id, "completed")}
              className="bg-green-500 px-4 py-2 mt-2 mr-2"
            >
              Mark as Completed
            </button>
            <button
              onClick={() => handleStatusChange(task._id, "pending")}
              className="bg-yellow-500 px-4 py-2 mt-2"
            >
              Mark as Pending
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamMemberDashboard;
