import React, { useEffect, useState } from "react";
import { fetchTaskById } from "../services/api";
import { useParams } from "react-router-dom";

const TaskDetailsPage = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const getTaskDetails = async () => {
      try {
        const data = await fetchTaskById(id);
        setTask(data);
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    };

    getTaskDetails();
  }, [id]);

  if (!task) {
    return <p>Loading task details...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Task Details</h1>
      <h2 className="text-xl">{task.title}</h2>
      <p>{task.description}</p>
      <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      <p>Priority: {task.priority}</p>
      <p>Status: {task.status}</p>
    </div>
  );
};

export default TaskDetailsPage;
