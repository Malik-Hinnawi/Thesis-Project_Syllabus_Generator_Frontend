import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/LoginPage.css";
import LoadingPage from "./LoadingPage";
import Snackbar from "./Snackbar";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [snackbar, setSnackbar] = useState({ message: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    setError("");
    setIsLoading(true);

    try {
      await login(username, password);
    } catch (err) {
      setError(err.message);
      setSnackbar({ message: "Unsuccessful Login Attempt!", type: "error" });
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <div className="login-page-container">
      <h2>Login</h2>
      {snackbar.message && (
        <Snackbar message={snackbar.message} type={snackbar.type} />
      )}
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
};

export default LoginPage;
