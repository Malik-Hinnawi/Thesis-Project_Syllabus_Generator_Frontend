import logo from "../assets/images/logo.png";
import "../styles/IntroductoryElement.css";

function IntroductoryElement() {
  return (
    <div className="introductory-elements-container">
      <div className="logo-container">
        <img src={logo} alt="logo" className="logo" />
      </div>
      <div className="introductory-texts">
        <p className="welcome-text">Welcome to the</p>
        <p className="bot-name">SyllaBot</p>
      </div>
    </div>
  );
}
export default IntroductoryElement;
