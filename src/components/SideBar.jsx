import "../styles/SideBar.css";

function SideBar() {
  return (
    <div className="sidebar-container">
      <div className="listed-chats">
        <div className="chat-1 listed-chat">Chat Number One!</div>
        <div className="chat-2 listed-chat">Chat Number Two!</div>
        <div className="chat-3 listed-chat">Chat Number Three!</div>
        <div className="chat-4 listed-chat">Chat Number Four!</div>
      </div>
      <div className="sidebar-buttons">
        <button className="sidebar-button new-chat-button">
          {/* <ion-icon name="add-circle-filled"></ion-icon> */}
          New Chat
        </button>
        <button className="sidebar-button delete-chat-button">
          {/* <ion-icon name="trash-filled"></ion-icon> */}
          Delete Chat
        </button>
      </div>
    </div>
  );
}

export default SideBar;
