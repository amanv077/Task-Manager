import React, { useEffect, useState } from "react";
import { fetchTasks, updateTaskStatus } from "../services/api";
import TaskCard from "../components/TaskCard";
import { useNavigate } from "react-router-dom";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getTasks = async () => {
      const data = await fetchTasks();
      setTasks(data);
    };
    getTasks();
  }, []);

  const handleStatusChange = async (taskId, status) => {
    try {
      const updatedTask = await updateTaskStatus(taskId, status);
      setTasks(tasks.map((task) => (task._id === taskId ? updatedTask : task)));
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleViewDetails = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">All Tasks</h1>
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onStatusChange={handleStatusChange}
          onViewDetails={handleViewDetails}
        />
      ))}
    </div>
  );
};

export default TaskPage;
