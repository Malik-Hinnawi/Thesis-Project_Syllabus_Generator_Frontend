import "../styles/InputArea.css";

import React, { useState } from "react";

function InputArea() {
  const [inputText, setInputText] = useState("");

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle submission of inputText (e.g., send it to the chatbot)
    console.log("User input:", inputText);
    // You can reset the input field after submission if needed
    setInputText("");
  };

  return (
    <div className="input-area-container">
      <div className="input-area-text">
        <p>How can I help you today?</p>
      </div>
      <div className="input-area-outline">
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <textarea
            value={inputText}
            onChange={handleChange}
            placeholder="Message SyllaBot..."
            rows={3}
            style={{
              outline: "none",
              resize: "none",
              fontFamily: "Roboto, sans-serif",
              placeholder: {
                padding: "5px",
              },
            }}
          />
        </form>
        <button className="input-area-button submit-button">
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
  );
}

export default InputArea;
