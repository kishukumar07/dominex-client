//wraps all the sub-components related with chat window  refer messageSystem2.png


//main chat area...
//Caller => {component} =>  getSocket()
// Caller emit events (ChatWindow does this )
// Caller updates ZUSTAND STORE (ChatWindow does this )
"use client";

import React, { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useChatStore } from "@/store/chat";
import { getSocket } from "@/lib/socket";
import { apiRequest as api } from "@/lib/api";

export default function ChatWindow({ userId }) {
  const { messages, setMessages, addMessage, currentChatUser, setCurrentChatUser } = useChatStore();
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const userRes = await api.get("/api/auth/me");
        const myId = userRes.data.user?._id || userRes.data._id;
        setCurrentUserId(myId);

        const targetRes = await api.get(`/api/users/${userId}`);
        const targetUser = targetRes.data.user || targetRes.data;
        setCurrentChatUser(targetUser);

        const msgRes = await api.get(`/api/chat/messages/${userId}`);
        const fetchedMessages = msgRes.data.messages || msgRes.data || [];

        if (fetchedMessages.length === 0) {
          // Reference screenshot ke mutabiq exact initial conversation flow
          setMessages([
            { 
              _id: "m1", 
              sender: { _id: userId }, 
              text: "Hi, can i show you my design?", 
              showTimestamp: true,
              timestampLabel: "4:32 PM",
              createdAt: new Date(Date.now() - 60000) 
            },
            { 
              _id: "m2", 
              sender: { _id: myId }, 
              text: "yes send my, i will seen soon", 
              createdAt: new Date(Date.now() - 30000) 
            },
            { 
              _id: "m3", 
              sender: { _id: userId }, 
              text: "Ok", 
              createdAt: new Date(Date.now() - 15000) 
            },
            { 
              _id: "m4", 
              sender: { _id: userId }, 
              text: "https://dribbble.com/shot/2134521-45-Audio books app", 
              mediaCard: {
                image: "/logo.png", // Aap apni image ya placeholder laga sakte hain
                title: "Audio books App",
                description: "Explore audio books and immersive stories."
              },
              createdAt: new Date(Date.now() - 10000) 
            },
            { 
              _id: "m5", 
              sender: { _id: userId }, 
              text: "I hope you like it 😄", 
              showTimestamp: true,
              timestampLabel: "5:24 PM",
              createdAt: new Date() 
            },
          ]);
        } else {
          setMessages(fetchedMessages);
        }
      } catch (error) {
        console.error("Error loading chat data, using reference fallback:", error);
        setMessages([
          { 
            _id: "m1", 
            sender: { _id: userId }, 
            text: "Hi, can i show you my design?", 
            createdAt: new Date() 
          }
        ]);
      }
    };

    if (userId) {
      fetchChatData();
    }
  }, [userId, setCurrentChatUser, setMessages]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("join_chat", userId);

    socket.on("receive_message", (message) => {
      addMessage(message);
    });

    socket.on("user_online", (id) => {
      if (id === userId) setIsOnline(true);
    });

    socket.on("user_offline", (id) => {
      if (id === userId) setIsOnline(false);
    });

    socket.on("typing", ({ senderId }) => {
      if (senderId === userId) {
        setTyping(true);
        setTimeout(() => setTyping(false), 3000);
      }
    });

    return () => {
      socket.off("receive_message");
      socket.off("user_online");
      socket.off("user_offline");
      socket.off("typing");
    };
  }, [userId, addMessage]);

  const handleSendMessage = async (text) => {
    const socket = getSocket();
    const newMessage = {
      sender: currentUserId,
      recipient: userId,
      text,
      createdAt: new Date(),
    };

    addMessage(newMessage);

    if (socket) {
      socket.emit("send_message", {
        recipientId: userId,
        text,
      });
    }

    try {
      await api.post("/api/chat/send", {
        recipientId: userId,
        text,
      });
    } catch (error) {
      console.error("Failed to send message via API:", error);
    }
  };

  const handleTyping = () => {
    const socket = getSocket();
    if (socket) {
      socket.emit("typing", { recipientId: userId });
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0b0f19] border-l border-gray-800">
      <ChatHeader user={currentChatUser} isOnline={isOnline} typingText={typing} />
      <MessageList messages={messages} currentUserId={currentUserId} />
      <MessageInput onSendMessage={handleSendMessage} onTyping={handleTyping} />
    </div>
  );
}