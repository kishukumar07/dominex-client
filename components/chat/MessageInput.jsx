// input + send button
"use client";

import React, { useState } from "react";

export default function MessageInput({ onSendMessage, onTyping }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSendMessage(text);
    setText("");
  };

  return (
    <div style={{ padding: "12px 24px 20px 24px", backgroundColor: "#0b0f19" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "8px 18px",
          backgroundColor: "#111827",
          border: "1px solid #1e293b",
          borderRadius: "9999px",
        }}
      >
        {/* Emoji Icon */}
        <button type="button" style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", display: "flex" }}>
          <svg style={{ width: "22px", height: "22px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>

        {/* Input */}
        <input
          type="text"
          placeholder="Your Message..."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (onTyping) onTyping();
          }}
          style={{
            flex: 1,
            backgroundColor: "transparent",
            border: "none",
            outline: "none",
            color: "#e2e8f0",
            fontSize: "14px",
            padding: "6px 0",
          }}
        />

        {/* Paperclip Icon */}
        <button type="button" style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", display: "flex" }}>
          <svg style={{ width: "20px", height: "20px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </button>

        {/* Neon Green Paper Plane Send Button */}
        <button
          type="submit"
          style={{
            background: "none",
            border: "none",
            color: "#a3e635",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg style={{ width: "22px", height: "22px", transform: "rotate(45deg)" }} fill="currentColor" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </form>
    </div>
  );
}