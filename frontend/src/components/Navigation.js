import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ user }) => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <div>
          <Link to="/" className="mr-4">
            Home
          </Link>
          {user.role === "admin" && (
            <Link to="/admin" className="mr-4">
              Admin Dashboard
            </Link>
          )}
          {user.role === "team-member" && (
            <Link to="/team-dashboard" className="mr-4">
              My Tasks
            </Link>
          )}
          <Link to="/profile" className="mr-4">
            Profile
          </Link>
        </div>
        <div>
          <Link to="/logout" className="mr-4">
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
