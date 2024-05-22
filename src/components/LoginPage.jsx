import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // navigate("/syllabot");

  const handleLogin = () => {
    // For simplicity, assume the login is always successful.
    // In a real app, you'd make an API call here.
    if (username === "user" && password === "password") {
      localStorage.setItem("authToken", "123456"); // Example token
      navigate("/syllabot");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-page-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <a className="sign-up-link" href="#">
        Are you new? Sign up
      </a>
    </div>
  );
};

export default LoginPage;
