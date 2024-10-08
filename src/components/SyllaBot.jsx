import React, { useState, useEffect, useContext } from "react";
import Introduction from "./Introduction";
import ModeSelector from "./ModeSelector";
import SideBar from "./SideBar";
import "../styles/SyllaBot.css";
import { AuthContext } from "../contexts/AuthContext"; // Import AuthContext
import instance from "../axios";

const SyllaBot = () => {
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(() => {
    const storedChatId = localStorage.getItem("currentChatId");
    return storedChatId ? parseInt(storedChatId) : null;
  });
  const [currentMessages, setCurrentMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [mode, setMode] = useState(1);
  const [newChat, setNewChat] = useState(false);
  const [loading, setLoading] = useState(false);
  const { logout } = useContext(AuthContext);

  /* GETTING ALL CHATS FOR THE CURRENT USER */

  useEffect(() => {
    const fetchChats = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in local storage");
        return;
      }

      try {
        const response = await instance.get("chat/user/chats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setChats(response.data);
        } else {
          console.error("Failed to fetch chats:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, []);

  /* GETTING ALL MESSAGES FOR THE SELECTED CHAT */

  const formatMessageContent = (msg) => {
    const { chapter, content, estimated_time, link, title, topics } = msg;
    let formattedContent = "";

    // if (content) {
    //   formattedContent += `${content
    //     .split(",")
    //     .map((line) => `${line}<br/>`)
    //     .join("")}<br/>`;
    // }

    if (content) {
      // Regular expression pattern to extract the desired part
      const pattern = /FROM '(.*?)'/;

      // Extract the part from the content
      const extractedPart = content.match(pattern);

      // Check if the part is extracted successfully
      if (extractedPart) {
        // Add the extracted part to the formatted content
        formattedContent += `<strong>${extractedPart[0]}</strong><br/>`;
      }

      // Split the remaining content by comma and format each line
      // formattedContent += `${content
      //   .replace(pattern, "") // Remove the extracted part
      //   .split(",")
      //   .map((line) => `${line.trim()}<br/>`)
      //   .join("")}<br/>`;
    }

    formattedContent.trim();

    if (chapter) {
      formattedContent += `<br/><b>Chapter:</b> ${chapter}<br/>`;
    }

    if (estimated_time) {
      formattedContent += `<br/><b>Estimated Time:</b> ${estimated_time} hours<br/>`;
    }

    if (title) {
      formattedContent += `<br/><b>Title:</b> <br/>${title}<br/>`;
    }

    if (topics) {
      const topicsList = topics
        .split(",")
        .map(
          (topic) =>
            `<li style="margin-left: 20px; text-transform: capitalize;"">${topic.trim()}</li>`
        )
        .join("");
      formattedContent += `<br/><b>Topics:</b><br/><ul>${topicsList}</ul>`;
    }

    if (link) {
      formattedContent += `<br/><b>Link:</b> <a href="${link}" target="_blank">${link}</a><br/>`;
    }

    return formattedContent.trim();
  };

  useEffect(() => {
    const fetchMessages = async () => {
      if (currentChatId === null) return;

      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in local storage");
        setLoading(false);
        return;
      }

      try {
        const response = await instance.get(`chat/${currentChatId}/messages`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          console.log(response.data);
          const messages = response.data
            .map((msg) => {
              const formattedMessage = {
                id: msg.id,
                chat_id: msg.chat_id,
                content: msg.content,
                timestamp: msg.timestamp,
                sender: "user",
              };

              const responseMessages = msg.response_messages.map((respMsg) => ({
                ...respMsg,
                content: formatMessageContent(respMsg),
                sender: "bot",
              }));

              return [formattedMessage, ...responseMessages];
            })
            .flat();

          setCurrentMessages(messages);

          const updatedChats = chats.map((chat) =>
            chat.id === currentChatId ? { ...chat, messages } : chat
          );

          setChats(updatedChats);
        } else {
          console.error("Failed to fetch messages:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }

      setLoading(false);
    };

    fetchMessages();
  }, [currentChatId]);

  /* IF THERE IS NO CHAT */

  useEffect(() => {
    if (chats.length === 0) {
      setCurrentChatId(null);
    }
  }, [chats]);

  /* HANDLE SENDING A NEW MESSAGE */
  const handleSend = async () => {
    if (userInput.trim()) {
      let chatId = currentChatId;

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in local storage");
        return;
      }

      if (currentChatId !== null) {
        const messagePayload = {
          content: userInput,
        };

        const newMessage = { content: userInput, sender: "user" };

        try {
          const endpoint =
            mode === 0
              ? `chat/${chatId}/syllabus-generator`
              : `chat/${chatId}/q-and-a`;

          const messageResponse = await instance.post(
            endpoint,
            messagePayload,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (messageResponse.status === 201) {
            const responseMessages = messageResponse.data.map((msg) => ({
              ...msg,
              content: formatMessageContent(msg),
              sender: "bot",
            }));

            const updatedMessages = [
              ...currentMessages,
              newMessage,
              ...responseMessages,
            ];
            setCurrentMessages(updatedMessages);

            const updatedChats = chats.map((chat) =>
              chat.id === chatId ? { ...chat, messages: updatedMessages } : chat
            );

            setChats(updatedChats);
            setUserInput("");
          } else {
            console.error(
              "Failed to send message:",
              messageResponse.statusText
            );
          }
        } catch (error) {
          console.error("Error while sending message:", error);
        }
      }
    }
  };

  const handleNewChat = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in local storage");
        return;
      }

      const newChatResponse = await instance.post(
        "chat/user/chats",
        { type: mode },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (newChatResponse.status === 201) {
        const newChatId = newChatResponse.data.id;
        setCurrentChatId(newChatId);
        setNewChat(true);
        const newChat = {
          id: newChatId,
          title: `Chat Number ${newChatId}!`,
          messages: [],
        };
        setChats([...chats, newChat]);
      } else {
        console.error("Failed to create new chat:", newChatResponse.statusText);
      }
    } catch (error) {
      console.error("Error creating new chat:", error);
    }
  };

  const handleDeleteChat = async () => {
    if (currentChatId !== null) {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in local storage");
        return;
      }

      try {
        const response = await instance.delete(
          `chat/user/chats/${currentChatId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          console.log("Chat deleted successfully:", response.data.message);
          const updatedChats = chats.filter(
            (chat) => chat.id !== currentChatId
          );
          setChats(updatedChats);
          setCurrentChatId(updatedChats.length ? updatedChats[0].id : null);
        } else {
          console.error("Failed to delete chat:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting chat:", error);
      }
    }
  };

  const handleChatSelection = (chatId) => {
    setCurrentChatId(chatId);
  };

  const currentChat = chats.find((chat) => chat.id === currentChatId);
  const shouldShowIntroduction =
    currentChatId === null || !currentChat || currentMessages.length === 0;

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
              {currentChat &&
                currentChat.messages &&
                currentChat.messages.map((msg, index) => (
                  <div key={index} className={`message ${msg.sender}`}>
                    <div dangerouslySetInnerHTML={{ __html: msg.content }} />
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
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SyllaBot;
