import React, { createContext, useState, useEffect } from "react";
import { loginUser, signupUser, logoutUser } from "../services/api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      // Ideally, you would validate the token by making a request to your server
      setUser({ token });
    }
  }, []);

  const login = async (email, password, role) => {
    const data = await loginUser(email, password, role); // Pass role here
    setUser(data);
  };

  const signup = async (name, email, password, role) => {
    const data = await signupUser(name, email, password, role); // Pass role here
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
