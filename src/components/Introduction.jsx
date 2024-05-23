import logo from "../assets/images/logo.png";
import "../styles/Introduction.css";

function Introduction() {
  return (
    <div className="introduction-container">
      <div className="logo-container">
        <img src={logo} alt="logo" className="logo" />
      </div>
      <div className="introduction-texts">
        <p className="welcome-text">Welcome to the</p>
        <p className="bot-name">SyllaBot</p>
      </div>
    </div>
  );
}
export default Introduction;
