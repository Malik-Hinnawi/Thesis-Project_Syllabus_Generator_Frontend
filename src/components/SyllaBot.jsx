import React, { useState, useEffect, useContext } from "react";
import Introduction from "./Introduction";
import ModeSelector from "./ModeSelector";
import SideBar from "./SideBar";
import "../styles/SyllaBot.css";
import { AuthContext } from "../contexts/AuthContext"; // Import AuthContext
import config from "../config";

const SyllaBot = () => {
  const [chats, setChats] = useState([
    { id: 1, title: "Chat Number One!", messages: [] },
    { id: 2, title: "Chat Number Two!", messages: [] },
    { id: 3, title: "Chat Number Three!", messages: [] },
    { id: 4, title: "Chat Number Four!", messages: [] },
  ]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [mode, setMode] = useState(1);

  const { logout } = useContext(AuthContext); // Access the logout function

  useEffect(() => {
    if (chats.length === 0) {
      setCurrentChatId(null);
    }
  }, [chats]);

  const handleSend = async () => {
    if (userInput.trim()) {
      let chatId = currentChatId;
      if (currentChatId === null) {
        chatId = chats.length ? chats[chats.length - 1].id + 1 : 1;
        const newChat = {
          id: chatId,
          title: `Chat Number ${chatId}!`,
          messages: [],
        };
        setChats([...chats, newChat]);
        setCurrentChatId(chatId);
      }

      const newMessage = { text: userInput, sender: "user" };
      const botResponse = {
        text: "This is a response from SyllaBot",
        sender: "bot",
      };

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === chatId
            ? { ...chat, messages: [...chat.messages, newMessage, botResponse] }
            : chat
        )
      );

      setUserInput("");
    }
  };

  const handleNewChat = () => {
    const newChatId = chats.length ? chats[chats.length - 1].id + 1 : 1;
    const newChat = {
      id: newChatId,
      title: `Chat Number ${newChatId}!`,
      messages: [],
    };
    setChats([...chats, newChat]);
    setCurrentChatId(newChatId);
  };

  const handleDeleteChat = () => {
    if (currentChatId !== null) {
      const updatedChats = chats.filter((chat) => chat.id !== currentChatId);
      setChats(updatedChats);
      setCurrentChatId(updatedChats.length ? updatedChats[0].id : null);
    }
  };

  const handleChatSelection = (chatId) => {
    setCurrentChatId(chatId);
  };

  const currentChat = chats.find((chat) => chat.id === currentChatId);

  const shouldShowIntroduction =
    currentChatId === null ||
    (currentChat && currentChat.messages.length === 0);

  return (
    <div className="syllabot-container">
      <div className="syllabot-outline">
        <div className="syllabot-sidebar">
          <SideBar
            chats={chats}
            currentChatId={currentChatId}
            onNewChat={handleNewChat}
            onDeleteChat={handleDeleteChat}
            onChatSelect={handleChatSelection}
          />
        </div>
        <div className="chat-container">
          {shouldShowIntroduction ? (
            <div className="chat-introduction-container">
              <Introduction />
              <ModeSelector mode={mode} setMode={setMode} />
            </div>
          ) : (
            <div className="chat-area">
              {currentChat.messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
            </div>
          )}
          <div className="input-area-container">
            <div className="input-area-text">
              <p>You can start by choosing the mode according to your needs!</p>
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
              <button
                onClick={logout}
                className="input-area-button logout-button"
              >
                LogOut
                <ion-icon name="log-out-outline"></ion-icon>
              </button>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SyllaBot;
