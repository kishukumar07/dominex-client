//Scrollable message bubble ...  


"use client";

import React, { useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";

export default function MessageList({ messages, currentUserId }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "16px 24px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        backgroundColor: "#0b0f19",
      }}
    >
      {messages && messages.length > 0 ? (
        messages.map((msg, index) => (
          <MessageBubble
            key={msg._id || msg.id || index}
            message={msg}
            currentUserId={currentUserId}
          />
        ))
      ) : (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#64748b", fontSize: "14px" }}>
          No messages yet. Start the conversation!
        </div>
      )}
      <div ref={scrollRef} />
    </div>
  );
}