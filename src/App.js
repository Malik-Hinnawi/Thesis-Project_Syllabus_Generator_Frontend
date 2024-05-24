import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Snackbar from "./components/Snackbar";
import SyllaBot from "./components/SyllaBot";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import LoadingPage from "./components/LoadingPage";
import NotFoundPage from "./components/NotFoundPage";
import AuthProvider, { AuthContext } from "./contexts/AuthContext";
import "./App.css";

/* ADDED ARBITRARILY */
// import Home from "./Home";
// import About from "./About";

// function App() {
// return (
//   <div className="app-container">
//     <div className="app-outline">
//       <div className="app-sidebar">
//         <SideBar />
//       </div>
//       <div className="app-content">
//         <SyllaBot />
//         {/* <LoginPage /> */}
//         {/* <SignUpPage /> */}
//       </div>
//     </div>
//   </div>
// );
// }

const App = () => {
  const [snackbar, setSnackbar] = useState({ message: "", type: "" });
  return (
    <div className="container">
      <Router>
        <AuthProviderWrapper setSnackbar={setSnackbar} />
        {snackbar.message && (
          <Snackbar message={snackbar.message} type={snackbar.type} />
        )}
      </Router>
    </div>
  );
};

const AuthProviderWrapper = ({ setSnackbar }) => {
  const navigate = useNavigate();

  return (
    <AuthProvider navigate={navigate} setSnackbar={setSnackbar}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/signup"
          element={<SignUpPage setSnackbar={setSnackbar} />}
        />
        <Route
          path="/syllabot"
          element={<ProtectedRoute element={<SyllaBot />} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
};

const ProtectedRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = React.useContext(AuthContext);

  if (isAuthenticated === null) {
    return <LoadingPage />;
  }

  return isAuthenticated ? element : <Navigate to="/" />;
};

export default App;
