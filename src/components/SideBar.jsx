import React from "react";
import "../styles/SideBar.css";

const SideBar = ({
  chats,
  currentChatId,
  onNewChat,
  onDeleteChat,
  onChatSelect,
}) => {
  return (
    <div className="sidebar-container">
      <div className="listed-chats">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`listed-chat ${
              chat.id === currentChatId ? "selected-chat" : ""
            }`}
            onClick={() => onChatSelect(chat.id)}
          >
            {chat.title}
          </div>
        ))}
      </div>
      <div className="sidebar-buttons">
        <button className="sidebar-button new-chat-button" onClick={onNewChat}>
          New Chat
        </button>
        <button
          className="sidebar-button delete-chat-button"
          onClick={onDeleteChat}
        >
          Delete Chat
        </button>
      </div>
    </div>
  );
};

export default SideBar;
