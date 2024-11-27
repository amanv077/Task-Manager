import React from "react";

const TaskCard = ({ task, onStatusChange, onViewDetails }) => {
  return (
    <div className="border p-4 mb-2 rounded shadow">
      <h3 className="text-lg font-bold">{task.title}</h3>
      <p>{task.description}</p>
      <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      <p>
        Priority: <span className="font-semibold">{task.priority}</span>
      </p>
      <p>
        Status: <span className="font-semibold">{task.status}</span>
      </p>
      <div className="mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 mr-2 rounded"
          onClick={() => onViewDetails(task._id)}
        >
          View Details
        </button>
        {task.status !== "completed" && (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => onStatusChange(task._id, "completed")}
          >
            Mark as Completed
          </button>
        )}
        {task.status === "completed" && (
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded"
            onClick={() => onStatusChange(task._id, "pending")}
          >
            Mark as Pending
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
