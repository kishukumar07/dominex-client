//left sidebar : shows the people user chated with 
"use client";

import React, { useState, useEffect } from "react";
import ConversationItem from "./ConversationItem";
import { useChatStore } from "@/store/chat";

const MOCK_CONVERSATIONS = [
  {
    _id: "user_123",
    participant: { _id: "user_123", name: "Albus", avatar: "https://i.pravatar.cc/150?u=albus", isOnline: true },
    lastMessage: "ok, see you tomorrow 😊",
    time: "10:24 PM",
    unread: true,
    isPinned: true,
  },
  {
    _id: "user_456",
    participant: { _id: "user_456", name: "jeksona", avatar: "https://i.pravatar.cc/150?u=jeksona", isOnline: false },
    lastMessage: "That sounds good!",
    time: "9:48 PM",
    readReceipt: true,
  },
  {
    _id: "user_789",
    participant: { _id: "user_789", name: "Mia", avatar: "https://i.pravatar.cc/150?u=mia", isOnline: false },
    lastMessage: "📷 Photo",
    time: "8:32 PM",
    readReceipt: true,
  },
  {
    _id: "user_101",
    participant: { _id: "user_101", name: "komy", avatar: "https://i.pravatar.cc/150?u=komy", isOnline: false },
    lastMessage: "Are you free now?",
    time: "7:15 PM",
    readReceipt: true,
  },
  {
    _id: "user_102",
    participant: { _id: "user_102", name: "Mike", avatar: "https://i.pravatar.cc/150?u=mike", isOnline: false },
    lastMessage: "Call me when u reach",
    time: "6:41 PM",
    readReceipt: true,
  },
  {
    _id: "user_103",
    participant: { _id: "user_103", name: "ludovi", avatar: "https://i.pravatar.cc/150?u=ludovi1", isOnline: false },
    lastMessage: "Thanks bro!",
    time: "5:22 PM",
    unread: true,
  },
  {
    _id: "user_104",
    participant: { _id: "user_104", name: "Stivy", avatar: "https://i.pravatar.cc/150?u=stivy", isOnline: false },
    lastMessage: "Cool 👍",
    time: "4:09 PM",
    readReceipt: true,
  },
  {
    _id: "user_105",
    participant: { _id: "user_105", name: "dire", avatar: "https://i.pravatar.cc/150?u=dire", isOnline: false },
    lastMessage: "Typing...",
    isTyping: true,
    time: "2:56 PM",
    unread: true,
  },
  {
    _id: "user_106",
    participant: { _id: "user_106", name: "Riya", avatar: "https://i.pravatar.cc/150?u=riya", isOnline: false },
    lastMessage: "See you soon",
    time: "11:03 AM",
    readReceipt: true,
  },
];

export default function ConversationList() {
  const { conversations, setConversations } = useChatStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL || "";
        const res = await fetch(`${serverUrl}/api/chat/conversations`, {
          credentials: "include",
        });

        const contentType = res.headers.get("content-type");
        if (!res.ok || !contentType || !contentType.includes("application/json")) {
          throw new Error("Backend API not ready, using mock data");
        }

        const json = await res.json();
        const data = json.conversations || json || [];
        setConversations(data.length > 0 ? data : MOCK_CONVERSATIONS);
      } catch (error) {
        // Fallback mein poore 9 friends set honge
        setConversations(MOCK_CONVERSATIONS);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [setConversations]);

  const filteredConversations = conversations.filter((conv) => {
    const name = conv.participant?.name || conv.name || "";
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", backgroundColor: "#0b0f19", userSelect: "none" }}>
      {/* Top Bar: Circle Icon + Search Input */}
      <div style={{ padding: "16px 16px 12px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ width: "26px", height: "26px", borderRadius: "50%", backgroundColor: "#64748b", flexShrink: 0 }} />
        <div style={{ position: "relative", flex: 1, display: "flex", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "9px 36px 9px 16px",
              fontSize: "14px",
              backgroundColor: "#131b2e",
              border: "1px solid #1e293b",
              borderRadius: "9999px",
              color: "#e2e8f0",
              outline: "none",
            }}
          />
          <svg
            style={{ position: "absolute", right: "12px", width: "16px", height: "16px", color: "#64748b", pointerEvents: "none" }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Messages & Pinned Header */}
      <div style={{ padding: "8px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: "18px", fontWeight: "700", color: "#f8fafc" }}>Messages</span>
        <span style={{ fontSize: "12px", color: "#64748b" }}>pinned</span>
      </div>

      {/* Friends / Conversations Scrollable List */}
      <div style={{ flex: 1, overflowY: "auto", padding: "4px 8px" }}>
        {loading ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "120px", color: "#64748b", fontSize: "14px" }}>
            Loading...
          </div>
        ) : filteredConversations.length > 0 ? (
          filteredConversations.map((conv) => (
            <ConversationItem key={conv._id || conv.id} conversation={conv} />
          ))
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "120px", color: "#64748b", fontSize: "14px" }}>
            No chats found
          </div>
        )}
      </div>
    </div>
  );
}