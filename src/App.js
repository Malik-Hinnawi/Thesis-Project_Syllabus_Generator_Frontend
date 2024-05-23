import "./App.css";
import SideBar from "./components/SideBar";
import SyllaBot from "./components/SyllaBot";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";

import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

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
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/syllabot" element={<SyllaBot />} />
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
