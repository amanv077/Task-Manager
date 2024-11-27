import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="text-center p-4">
      <h1 className="text-3xl mb-4">404 - Page Not Found</h1>
      <Link to="/" className="text-blue-500 underline">
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
