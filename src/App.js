import "./App.css";
import SideBar from "./components/SideBar";
import IntroductoryElement from "./components/IntroductoryElement";
import InputArea from "./components/InputArea";
import SyllaBot from "./components/SyllaBot";

function App() {
  return (
    <div className="app-container">
      <div className="app-outline">
        <div className="app-sidebar">
          <SideBar />
        </div>
        <div className="app-content">
          <SyllaBot />
        </div>
      </div>
    </div>
  );
}

export default App;
