import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
// import SideBar from "./components/SideBar";
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
  return (
    <div className="container">
      <Router>
        <AuthProviderWrapper />
      </Router>
    </div>
  );
};

const AuthProviderWrapper = () => {
  const navigate = useNavigate();

  return (
    <AuthProvider navigate={navigate}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
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
