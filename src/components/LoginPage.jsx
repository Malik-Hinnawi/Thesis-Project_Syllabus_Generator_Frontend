import React, { useEffect, useState } from "react";
import instance from "../axios";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Log the base URL to debug
    console.log("Axios instance base URL:", instance.defaults.baseURL);
  }, []);

  // navigate("/syllabot");

  const handleLogin = async (event) => {
    setError("");

    try {
      const response = await instance.post("/auth/login", {
        email: username,
        password: password,
      });

      if (response.data.access_token) {
        // Assuming the response contains a token for authentication

        localStorage.setItem("token", response.data.access_token);
        // Redirect to a different page or update the state to reflect the logged-in status
        navigate("/syllabot");
      } else {
        setError("Invalid login credentials");
      }
    } catch (err) {
      setError(err.message);
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
      <a className="sign-up-link" href="/signup">
        Are you new? Sign up
      </a>
    </div>
  );

  // For simplicity, assume the login is always successful.
  // In a real app, you'd make an API call here.
  // if (username === "user" && password === "password") {
  //   localStorage.setItem("authToken", "123456"); // Example token
  //   navigate("/syllabot");
  // } else {
  //   alert("Invalid credentials");
  // }
};

export default LoginPage;
