import React, { useState } from "react";
import IntroductoryElement from "./IntroductoryElement";
import ModeSelector from "./ModeSelector";
import "../styles/SyllaBot.css"; // Assuming you have some CSS for styling

const SyllaBot = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const handleSend = () => {
    if (userInput.trim()) {
      // Add user message to the chat
      setMessages([...messages, { text: userInput, sender: "user" }]);
      // Add a bot response (for demo purposes, this is static)
      setMessages([
        ...messages,
        { text: userInput, sender: "user" },
        { text: "This is a response from SyllaBot", sender: "bot" },
      ]);
      // Hide the intro text
      setShowIntro(false);
      // Clear the input field
      setUserInput("");
    }
  };

  return (
    <div className="chat-container">
      {showIntro ? (
        <div className="introductory-element-container">
          {/* <IntroductoryElement /> */}
          <ModeSelector />
        </div>
      ) : (
        <div className="chat-area">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>
      )}
      <div className="input-area-container">
        <div className="input-area-text">
          <p>How can I help you today?</p>
        </div>
        <div className="input-area-outline">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Message SyllaBot..."
            rows={3}
            style={{
              display: "flex",
              justifyContent: "center",
              outline: "none",
              resize: "none",
              fontFamily: "Roboto, sans-serif",
              overflow: "hidden",
              placeholder: {
                padding: "5px",
              },
            }}
          ></input>
          <button
            onClick={handleSend}
            className="input-area-button submit-button"
          >
            <ion-icon name="send"></ion-icon>
          </button>
          <button className="input-area-button attach-button">
            <ion-icon name="attach"></ion-icon>
          </button>
          <button className="input-area-button upload-button">
            <ion-icon name="link"></ion-icon>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SyllaBot;
