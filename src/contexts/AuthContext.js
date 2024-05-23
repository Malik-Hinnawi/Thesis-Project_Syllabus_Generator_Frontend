import React, { createContext, useState, useEffect } from "react";
import instance from "../axios";

export const AuthContext = createContext();

const AuthProvider = ({ children, navigate }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    // Check if there is a token in local storage
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await instance.post("/auth/login", {
        email: username,
        password: password,
      });

      if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
        setIsAuthenticated(true);
        navigate("/syllabot");
      } else {
        throw new Error("Invalid login credentials");
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
