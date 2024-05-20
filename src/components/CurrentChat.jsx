import "../styles/CurrentChat.css";

import React, { useState } from "react";

function CurrentChat() {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (message) => {
    // Send user message to chatbot framework and get response
    // const response = await chatbot.sendMessage(message);
    const response = "aaaaa";
    // Update chat history with user message and chatbot response
    setMessages([
      ...messages,
      { text: message, isUser: true },
      { text: response, isUser: false },
    ]);
  };

  return (
    <div className="current-chat-container">
      <div className="chat-history">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.isUser ? "user" : "bot"}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const message = e.target.message.value;
          sendMessage(message);
          e.target.message.value = "";
        }}
      >
        <input type="text" name="message" placeholder="Type your message..." />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default CurrentChat;
