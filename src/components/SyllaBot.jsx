import React, { useState, useEffect, useContext } from "react";
import Introduction from "./Introduction";
import ModeSelector from "./ModeSelector";
import SideBar from "./SideBar";
import "../styles/SyllaBot.css";
import { AuthContext } from "../contexts/AuthContext"; // Import AuthContext
import instance from "../axios";

const SyllaBot = () => {
  // const [chats, setChats] = useState([
  //   { id: 1, title: "Chat Number One!", messages: [] },
  //   { id: 2, title: "Chat Number Two!", messages: [] },
  //   { id: 3, title: "Chat Number Three!", messages: [] },
  //   { id: 4, title: "Chat Number Four!", messages: [] },
  // ]);
  // const [currentChatId, setCurrentChatId] = useState(null);
  // const [userInput, setUserInput] = useState("");

  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(() => {
    const storedChatId = localStorage.getItem("currentChatId");
    return storedChatId ? parseInt(storedChatId) : null;
  });

  const [currentMessages, setCurrentMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [mode, setMode] = useState(1);
  const [newChat, setNewChat] = useState(false);

  const { logout } = useContext(AuthContext);

  /* GETTING AL CHATS FOR THE CURRENT USER */

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

  useEffect(() => {
    const fetchMessages = async () => {
      if (currentChatId === null) return;

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in local storage");
        return;
      }

      try {
        const response = await instance.get(`chat/${currentChatId}/messages`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setCurrentMessages(response.data);
          console.log(response.data);
        } else {
          console.error("Failed to fetch messages:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [currentChatId]);

  /* IF THERE IS NO CHAT */

  useEffect(() => {
    if (chats.length === 0) {
      setCurrentChatId(null);
    }
  }, [chats]);

  // const handleSend = async () => {
  //   if (userInput.trim()) {
  //     let chatId = currentChatId;

  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       console.error("No token found in local storage");
  //       return;
  //     }

  //     if (currentChatId === null) {
  //       try {
  //         const chatCreationResponse = await instance.post(
  //           "chat/user/chats",
  //           { type: mode },
  //           {
  //             headers: {
  //               "Content-Type": "application/json",
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }
  //         );

  //         chatId = chatCreationResponse.data.id;
  //         console.log(chatId);
  //         setNewChat(true);

  //         const newChat = {
  //           id: chatId,
  //           title: `Chat Number ${chatId}!`,
  //           messages: [],
  //         };
  //         setChats([...chats, newChat]);
  //         setCurrentChatId(chatId);
  //       } catch (error) {
  //         console.error("Error creating new chat:", error);
  //         return;
  //       }
  //     }

  //     const messagePayload = {
  //       content: userInput,
  //     };

  //     try {
  //       const endpoint =
  //         mode === 1
  //           ? `chat/${chatId}/q-and-a`
  //           : `chat/${chatId}/syllabus-generator`;

  //       const messageResponse = await instance.post(endpoint, messagePayload, {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (messageResponse.status === 201) {
  //         const data = messageResponse.data;
  //         console.log("Message successfully sent:", data);

  //         const {
  //           id,
  //           chat_id,
  //           message_id,
  //           title,
  //           link,
  //           content,
  //           chapter,
  //           estimated_time,
  //           topics,
  //         } = data;

  //         const newMessage = {
  //           id,
  //           chat_id,
  //           message_id,
  //           title,
  //           link,
  //           content,
  //           chapter,
  //           estimated_time,
  //           topics,
  //         };

  //         const updatedChats = chats.map((chat) =>
  //           chat.id === chatId
  //             ? { ...chat, messages: [...chat.messages, newMessage] }
  //             : chat
  //         );

  //         setChats(updatedChats);
  //         setUserInput(""); // Clear the input field
  //       } else {
  //         console.error("Failed to send message:", messageResponse.statusText);
  //       }
  //     } catch (error) {
  //       console.error("Error while sending message:", error);
  //     }
  //   }
  // };

  // const handleNewChat = () => {
  //   const newChatId = chats.length ? chats[chats.length - 1].id + 1 : 1;
  //   const newChat = {
  //     id: newChatId,
  //     title: `Chat Number ${newChatId}!`,
  //     messages: [],
  //   };
  //   setChats([...chats, newChat]);
  //   setCurrentChatId(newChatId);
  // };

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

        try {
          const endpoint = `chat/${chatId}/syllabus-generator`;

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

          if (messageResponse.status === 200) {
            const data = messageResponse.data;
            console.log("Message successfully sent:", data);

            const updatedMessages = [...currentMessages, ...data];
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
                  <div key={index} className="message">
                    <div className="message-content">{msg.content}</div>
                    {msg.title && (
                      <div className="message-title">{msg.title}</div>
                    )}
                    {msg.topics && (
                      <div className="message-topics">{msg.topics}</div>
                    )}
                    {msg.link && (
                      <div className="message-link">
                        <a
                          href={msg.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {msg.link}
                        </a>
                      </div>
                    )}
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
