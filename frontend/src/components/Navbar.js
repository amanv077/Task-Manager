import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Assuming you have an AuthContext

const Navbar = ({ logout }) => {
  const { user } = useContext(AuthContext); // Get user from context

  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-2xl">
          Task Manager
        </Link>
        <div>
          <Link to="/tasks" className="mr-4">
            Tasks
          </Link>

          {user ? ( // Check if user is logged in
            <>
              <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
