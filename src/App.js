import "./App.css";
import SideBar from "./components/SideBar";
import IntroductoryElement from "./components/IntroductoryElement";
import InputArea from "./components/InputArea";
import CurrentChat from "./components/CurrentChat";
import SyllaBot from "./components/SyllaBot";

function App() {
  return (
    <div className="app-container">
      <div className="app-outline">
        <div className="app-sidebar">
          <SideBar />
        </div>
        <div className="app-content">
          <div className="app-section">
            <IntroductoryElement />
            {/* <SyllaBot /> */}
          </div>
          <div className="app-input-area">
            <InputArea />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
