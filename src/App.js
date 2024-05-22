import "./App.css";
import SideBar from "./components/SideBar";
import SyllaBot from "./components/SyllaBot";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";

function App() {
  return (
    <div className="app-container">
      <div className="app-outline">
        <div className="app-sidebar">
          <SideBar />
        </div>
        <div className="app-content">
          <SyllaBot />
          {/* <LoginPage /> */}
          {/* <SignUpPage /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
