"use client";

import React, { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useChatStore } from "@/store/chat";
import { useAuthStore } from "@/store/auth";
import { apiRequest } from "@/lib/api";
import { getSocket } from "@/lib/socket";

const getMockMessages = (userId, myId, avatar) => [
  {
    _id: "m1",
    sender: { _id: userId },
    senderAvatar: avatar,
    text: "Hi, can i show you my designe?",
    showDateBadge: true,
    dateBadgeLabel: "Today",
    time: "4:32 PM",
  },
  {
    _id: "m2",
    sender: { _id: myId },
    text: "yes sand my, i will seen soon",
    time: "4:33 PM",
  },
  {
    _id: "m3",
    sender: { _id: userId },
    senderAvatar: avatar,
    text: "Ok",
    time: "4:34 PM",
  },
  {
    _id: "m4",
    sender: { _id: userId },
    hideAvatar: true,
    text: "https://dribbble.com/shot/2134521-45\nAudio books app",
    mediaCard: {
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80",
      title: "Audio books App",
    },
    time: "5:10 PM",
  },
  {
    _id: "m5",
    sender: { _id: userId },
    hideAvatar: true,
    text: "I hope you like it 😊",
    time: "5:10 PM",
  },
  {
    _id: "m6",
    sender: { _id: myId },
    isAudio: true,
    time: "5:24 PM",
  },
];

export default function ChatWindow({ userId }) {
  const { messages, setMessages, addMessage, currentChatUser, setCurrentChatUser, conversations } = useChatStore();
  const { user: authUser } = useAuthStore();
  const currentUserId = authUser?._id || "me_user";
  const [isOnline] = useState(true);
  const [typing] = useState(false);

  useEffect(() => {
    const loadUserAndMessages = async () => {
      // 1. Pehle sidebar conversations mein check karo
      const foundConv = conversations.find(
        (c) => (c.participant?._id || c._id) === userId
      );

      let activeUser = foundConv?.participant;

      // 2. Agar real MongoDB userId hai toh `users/profile/${userId}` se fresh profile lao
      if (!userId.startsWith("user_")) {
        try {
          const res = await apiRequest(`users/profile/${userId}`, "GET");
          if (res?.success && res?.data) {
            const u = res.data;
            const displayName = u.name || u.fullname || u.fullName || u.username || "User";
            activeUser = {
              _id: u._id,
              name: displayName,
              username: u.username ? `@${u.username}` : "",
              avatar:
                u.avatar ||
                u.profilePic ||
                u.profilePicture ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=1e293b&color=f8fafc`,
              isOnline: true,
            };
          }
        } catch (err) {
          console.error("Failed to fetch target user profile:", err);
        }
      }

      if (!activeUser) {
        activeUser = {
          _id: userId,
          name: "Albus",
          avatar: "https://i.pravatar.cc/150?u=albus",
          isOnline: true,
        };
      }

      setCurrentChatUser(activeUser);

      // 3. Messages fetch karo (fallback to mock UI messages if empty)
      try {
        const msgRes = await apiRequest(`chat/messages/${userId}`, "GET");
        const fetchedMessages = msgRes?.data || msgRes?.messages || [];
        if (Array.isArray(fetchedMessages) && fetchedMessages.length > 0) {
          setMessages(fetchedMessages);
        } else {
          setMessages(getMockMessages(userId, currentUserId, activeUser.avatar));
        }
      } catch {
        setMessages(getMockMessages(userId, currentUserId, activeUser.avatar));
      }
    };

    if (userId) {
      loadUserAndMessages();
    }
  }, [userId, currentUserId, conversations, setCurrentChatUser, setMessages]);

  const handleSendMessage = async (text) => {
    const newMessage = {
      _id: Date.now().toString(),
      sender: currentUserId,
      recipient: userId,
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    addMessage(newMessage);

    const socket = getSocket();
    if (socket && socket.connected) {
      socket.emit("send_message", { recipientId: userId, text });
    }

    try {
      await apiRequest("chat/send", "POST", { recipientId: userId, text });
    } catch {
      // Ignore if backend route not ready
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#0b0f19]">
      <ChatHeader user={currentChatUser} isOnline={isOnline} typingText={typing} />
      <MessageList messages={messages} currentUserId={currentUserId} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}