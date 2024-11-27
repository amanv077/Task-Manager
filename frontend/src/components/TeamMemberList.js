import React, { useEffect, useState } from "react";
import {
  fetchUsers,
  assignTaskToUser,
  removeTaskFromUser,
} from "../services/api";

const TeamMemberList = ({ tasks }) => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const getTeamMembers = async () => {
      try {
        const users = await fetchUsers();
        setTeamMembers(users.filter((user) => user.role === "team-member"));
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };

    getTeamMembers();
  }, []);

  const handleAssignTask = async (userId, taskId) => {
    try {
      await assignTaskToUser(userId, taskId);
      alert("Task assigned successfully!");
    } catch (error) {
      console.error("Error assigning task:", error);
    }
  };

  const handleRemoveTask = async (userId, taskId) => {
    try {
      await removeTaskFromUser(userId, taskId);
      alert("Task removed successfully!");
    } catch (error) {
      console.error("Error removing task:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Team Members</h2>
      <ul>
        {teamMembers.map((member) => (
          <li key={member._id} className="border p-4 mb-2">
            <h3>{member.name}</h3>
            <p>Email: {member.email}</p>
            <ul>
              {tasks.map((task) => (
                <li key={task._id}>
                  {task.title}{" "}
                  <button
                    onClick={() => handleAssignTask(member._id, task._id)}
                    className="bg-blue-500 px-2 py-1 text-white ml-2"
                  >
                    Assign
                  </button>
                  <button
                    onClick={() => handleRemoveTask(member._id, task._id)}
                    className="bg-red-500 px-2 py-1 text-white ml-2"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamMemberList;
