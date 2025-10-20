import React, { useState, useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import Navbar from "../Pages/Navbar";

const Messages = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [searchParams] = useSearchParams();
  const recipientIdFromUrl = searchParams.get("userId");
  const artworkIdFromUrl = searchParams.get("artworkId");

  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [typing, setTyping] = useState(false);
  
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Initialize Socket.IO
  useEffect(() => {
    if (!isAuthenticated || !user) return;

    socketRef.current = io(import.meta.env.VITE_API_BASE_URL, {
      transports: ["websocket"],
    });

    socketRef.current.on("connect", () => {
      console.log("✅ Connected to Socket.IO");
      socketRef.current.emit("user:join", user.sub);
    });

    socketRef.current.on("message:receive", (message) => {
      console.log("📨 New message received:", message);
      
      // Add to messages if conversation is open
      if (selectedConversation && 
          (message.senderId === selectedConversation.user.auth0Id)) {
        setMessages((prev) => [...prev, message]);
        
        // Mark as read
        markMessagesAsRead(message.senderId);
      }
      
      // Update conversations list
      fetchConversations();
    });

    socketRef.current.on("typing:user", ({ senderId, typing }) => {
      if (selectedConversation && senderId === selectedConversation.user.auth0Id) {
        setTyping(typing);
      }
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [isAuthenticated, user, selectedConversation]);

  // Fetch conversations on mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchConversations();
    }
  }, [isAuthenticated]);

  // Auto-select conversation from URL
  useEffect(() => {
    if (recipientIdFromUrl && conversations.length > 0) {
      const conv = conversations.find(
        (c) => c.user.auth0Id === recipientIdFromUrl
      );
      if (conv) {
        selectConversation(conv);
      }
    }
  }, [recipientIdFromUrl, conversations]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchConversations = async () => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });

      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/messages/conversations`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setConversations(res.data.conversations);
    } catch (err) {
      console.error("Error fetching conversations:", err);
    } finally {
      setLoading(false);
    }
  };

  const selectConversation = async (conversation) => {
    setSelectedConversation(conversation);
    
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });

      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/messages/conversation/${conversation.user.auth0Id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessages(res.data.messages);
      
      // Mark messages as read
      if (conversation.unreadCount > 0) {
        markMessagesAsRead(conversation.user.auth0Id);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  const markMessagesAsRead = async (senderId) => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });

      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/messages/read`,
        { senderId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update conversations list
      fetchConversations();
    } catch (err) {
      console.error("Error marking messages as read:", err);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !selectedConversation) return;

    setSending(true);

    const messageData = {
      recipientId: selectedConversation.user.auth0Id,
      senderId: user.sub,
      content: newMessage.trim(),
      artworkId: artworkIdFromUrl || null,
    };

    try {
      // Send via Socket.IO for real-time
      socketRef.current.emit("message:send", messageData);

      // Also save to database via REST API
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/messages/send`,
        messageData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Add to local messages
      setMessages((prev) => [...prev, res.data.message]);
      setNewMessage("");
      
      // Update conversations
      fetchConversations();
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  const handleTyping = () => {
    if (!selectedConversation) return;

    // Emit typing start
    socketRef.current.emit("typing:start", {
      recipientId: selectedConversation.user.auth0Id,
      senderId: user.sub,
    });

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Stop typing after 2 seconds
    typingTimeoutRef.current = setTimeout(() => {
      socketRef.current.emit("typing:stop", {
        recipientId: selectedConversation.user.auth0Id,
        senderId: user.sub,
      });
    }, 2000);
  };

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <div className="mt-32 text-center text-lg text-gray-600">
          Please log in to view messages
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="mt-16 h-[calc(100vh-4rem)] flex">
        {/* Conversations List */}
        <div className="w-full md:w-1/3 border-r bg-white overflow-y-auto">
          <div className="p-4 border-b bg-gray-50">
            <h2 className="text-xl font-bold text-gray-800">Messages</h2>
          </div>

          {conversations.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No conversations yet
            </div>
          ) : (
            <div>
              {conversations.map((conv) => (
                <div
                  key={conv.user.auth0Id}
                  onClick={() => selectConversation(conv)}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition ${
                    selectedConversation?.user.auth0Id === conv.user.auth0Id
                      ? "bg-blue-50"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {conv.user.avatar ? (
                      <img
                        src={conv.user.avatar}
                        alt={conv.user.username}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        {conv.user.username?.[0].toUpperCase() || "?"}
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p className="font-semibold text-gray-800 truncate">
                          {conv.user.fullname || conv.user.username}
                        </p>
                        {conv.unreadCount > 0 && (
                          <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                            {conv.unreadCount}
                          </span>
                        )}
                      </div>
                      {conv.lastMessage && (
                        <p className="text-sm text-gray-600 truncate">
                          {conv.lastMessage.content}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 bg-white border-b flex items-center gap-3">
                {selectedConversation.user.avatar ? (
                  <img
                    src={selectedConversation.user.avatar}
                    alt={selectedConversation.user.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {selectedConversation.user.username?.[0].toUpperCase() || "?"}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-800">
                    {selectedConversation.user.fullname || selectedConversation.user.username}
                  </p>
                  {typing && (
                    <p className="text-xs text-gray-500">typing...</p>
                  )}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`flex ${
                      msg.senderId === user.sub ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                        msg.senderId === user.sub
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-800 border"
                      }`}
                    >
                      <p>{msg.content}</p>
                      <p className={`text-xs mt-1 ${
                        msg.senderId === user.sub ? "text-blue-100" : "text-gray-500"
                      }`}>
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={sendMessage} className="p-4 bg-white border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => {
                      setNewMessage(e.target.value);
                      handleTyping();
                    }}
                    placeholder="Type a message..."
                    className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={sending}
                  />
                  <button
                    type="submit"
                    disabled={sending || !newMessage.trim()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {sending ? "..." : "Send"}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Messages;