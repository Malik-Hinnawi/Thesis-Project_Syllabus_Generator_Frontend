import React, { useState } from "react";
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
        <div className="intro">
          <div className="intro-logo">
            <img src="logo.png" alt="SyllaBot Logo" />
          </div>
          <h1>Welcome to the SyllaBot</h1>
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
      <div className="input-area">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Message SyllaBot..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default SyllaBot;
