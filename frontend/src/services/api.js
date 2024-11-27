import axios from "axios";

// Base API URL (ensure this matches your backend URL in .env)
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Configure Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function to get the authentication token
const getAuthToken = () => localStorage.getItem("authToken");

// Function to fetch a task by its ID
export const fetchTaskById = async (taskId) => {
  try {
    const response = await api.get(`/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching task by ID:", error);
    throw error;
  }
};

// Function to fetch user profile
export const fetchUserProfile = async () => {
  try {
    const response = await api.get("/users/profile", {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

// Function to update user profile
export const updateUserProfile = async (updatedProfile) => {
  try {
    const response = await api.put("/users/profile", updatedProfile, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

// Fetch users
export const fetchUsers = async () => {
  try {
    const response = await api.get("/users", {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Assign task to user
export const assignTaskToUser = async (userId, taskId) => {
  try {
    const response = await api.post(
      `/users/${userId}/assign-task`,
      { taskId },
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error assigning task to user:", error);
    throw error;
  }
};

// Remove task from user
export const removeTaskFromUser = async (userId, taskId) => {
  try {
    const response = await api.post(
      `/users/${userId}/remove-task`,
      { taskId },
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error removing task from user:", error);
    throw error;
  }
};

// Authentication API calls
export const loginUser = async (email, password, role) => {
  const { data } = await api.post("/auth/login", { email, password, role }); // Pass the role
  localStorage.setItem("authToken", data.token);
  return data;
};

export const signupUser = async (name, email, password, role) => {
  try {
    const { data } = await api.post("/auth/signup", {
      name,
      email,
      password,
      role,
    });
    localStorage.setItem("authToken", data.token); // Save the token in localStorage
    return data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

// Task API calls
export const fetchTasks = async () => {
  try {
    const { data } = await api.get("/tasks", {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const createTask = async (taskData) => {
  try {
    const { data } = await api.post("/tasks", taskData, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const updateTaskStatus = async (taskId, status) => {
  try {
    const { data } = await api.put(
      `/tasks/${taskId}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Error updating task status:", error);
    throw error;
  }
};

// Function to update a task
export const updateTask = async (taskId, updatedTaskData) => {
  try {
    const response = await api.put(`/tasks/${taskId}`, updatedTaskData, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (taskId) => {
  try {
    const { data } = await api.delete(`/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
