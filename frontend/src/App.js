import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { fetchTasks } from "./services/api";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import TaskPage from "./pages/TaskPage";
import SignupPage from "./pages/SignupPage";
import AdminDashboard from "./pages/AdminDashboard";
import TeamMemberDashboard from "./pages/TeamMemberDashboard";
import TaskDetailsPage from "./pages/TaskDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import UserProfilePage from "./pages/UserProfilePage";
import Logout from "./components/Logout";

const App = () => {
  const { user, logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (user) {
      const getTasks = async () => {
        const data = await fetchTasks();
        setTasks(data);
      };
      getTasks();
    }
  }, [user]);

  return (
    <Router>
      <Navbar logout={logout} />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/tasks" element={<TaskPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/team-dashboard" element={<TeamMemberDashboard />} />
          <Route path="/tasks/:id" element={<TaskDetailsPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
