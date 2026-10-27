//single item of conversationList...
"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { useChatStore } from "@/store/chat";

export default function ConversationItem({ conversation }) {
  const router = useRouter();
  const params = useParams();
  const { setCurrentChatUser } = useChatStore();

  const participant = conversation.participant || conversation;
  const userId = participant._id || participant.id;
  const isActive = params?.userId === userId;

  const handleClick = () => {
    setCurrentChatUser(participant);
    router.push(`/main/chat/${userId}`);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "10px 12px",
        marginBottom: "4px",
        borderRadius: "10px",
        cursor: "pointer",
        backgroundColor: isActive ? "#192534" : "transparent",
        borderLeft: isActive ? "4px solid #84cc16" : "4px solid transparent",
        borderBottom: isActive ? "none" : "1px solid rgba(30, 41, 59, 0.5)",
        transition: "background-color 0.15s ease",
      }}
    >
      {/* Avatar */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        <img
          src={participant.avatar || "/avatar.png"}
          alt={participant.name}
          style={{ width: "46px", height: "46px", borderRadius: "50%", objectFit: "cover", display: "block" }}
        />
      </div>

      {/* Info & Last Message */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
          <h4 style={{ fontWeight: "600", fontSize: "14px", color: "#f1f5f9", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {participant.name}
          </h4>
          <span style={{ fontSize: "11px", color: "#94a3b8", flexShrink: 0 }}>
            {conversation.time || "10:24 PM"}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <p
            style={{
              fontSize: "12px",
              margin: 0,
              color: conversation.isTyping ? "#94a3b8" : "#94a3b8",
              fontStyle: conversation.isTyping ? "italic" : "normal",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {conversation.isTyping ? "Typing..." : conversation.lastMessage || "Say hello..."}
          </p>

          {/* Green Unread Dot OR Blue Double Checkmark */}
          {conversation.unread ? (
            <span style={{ width: "10px", height: "10px", backgroundColor: "#84cc16", borderRadius: "50%", flexShrink: 0, marginLeft: "8px" }} />
          ) : conversation.readReceipt ? (
            <span style={{ fontSize: "11px", color: "#38bdf8", fontWeight: "bold", flexShrink: 0, marginLeft: "8px", letterSpacing: "-2px" }}>
              ✓✓
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}