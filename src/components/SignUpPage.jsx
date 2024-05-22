import React, { useState } from "react";
import instance from "../axios";
import { useNavigate } from "react-router-dom";
import "../styles/SignUpPage.css";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // const handleLogin = () => {
  //   // For simplicity, assume the login is always successful.
  //   // In a real app, you'd make an API call here.
  //   if (username === "user" && password === "password") {
  //     localStorage.setItem("authToken", "123456"); // Example token
  //     history.push("/home");
  //   } else {
  //     alert("Invalid credentials");
  //   }
  // };

  const handleSignUp = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await instance.post(
        "https://syllabusgeneratorbackend.onrender.com/auth/signup",
        {
          email: email,
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="sign-up-page-container">
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {/* <button onClick={handleLogin}>Login</button> */}
      <button onClick={handleSignUp}>Sign Up</button>
      <a className="sign-up-link" href="/">
        Already have an account? Log in
      </a>
    </div>
  );
};

export default SignUpPage;
