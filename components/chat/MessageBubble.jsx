//Single mesaage {sent/recieved styling...}
"use client";

import React from "react";

export default function MessageBubble({ message, currentUserId }) {
  const senderId = message.sender?._id || message.sender || message.senderId;
  const isOwn = senderId === currentUserId;

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {/* Center "Today" Pill Badge */}
      {message.showDateBadge && (
        <div
          style={{
            alignSelf: "center",
            margin: "8px 0 16px 0",
            padding: "4px 16px",
            backgroundColor: "#162032",
            color: "#94a3b8",
            fontSize: "12px",
            borderRadius: "9999px",
          }}
        >
          {message.dateBadgeLabel || "Today"}
        </div>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: isOwn ? "flex-end" : "flex-start",
          gap: "10px",
          width: "100%",
        }}
      >
        {/* Receiver Small Avatar */}
        {!isOwn && (
          <div style={{ width: "34px", flexShrink: 0 }}>
            {!message.hideAvatar && (
              <img
                src={message.senderAvatar || "https://i.pravatar.cc/150?u=albus"}
                alt="avatar"
                style={{ width: "34px", height: "34px", borderRadius: "50%", objectFit: "cover", display: "block" }}
              />
            )}
          </div>
        )}

        {/* Bubble Box */}
        <div
          style={{
            maxWidth: "360px",
            backgroundColor: isOwn ? "#1a2b49" : "#162032",
            color: "#f1f5f9",
            borderRadius: "14px",
            padding: "10px 14px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
          }}
        >
          {/* Text Content */}
          {message.text && (
            <p style={{ margin: 0, fontSize: "13.5px", lineHeight: "1.45", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
              {message.text}
            </p>
          )}

          {/* Rich Link / Image Card Preview */}
          {message.mediaCard && (
            <div style={{ marginTop: "8px", borderRadius: "10px", overflow: "hidden", backgroundColor: "#fce7f3" }}>
              <img
                src={message.mediaCard.image}
                alt="Preview"
                style={{ width: "100%", height: "170px", objectFit: "cover", display: "block" }}
              />
            </div>
          )}

          {message.mediaCard?.title && (
            <div style={{ marginTop: "8px", fontWeight: "600", fontSize: "13.5px", color: "#f8fafc" }}>
              {message.mediaCard.title}
            </div>
          )}

          {/* Audio / Voice Note Waveform */}
          {message.isAudio && (
            <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: "230px", padding: "2px 0" }}>
              <button
                type="button"
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#f8fafc",
                  fontSize: "16px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ▶
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: "3px", flex: 1, height: "24px" }}>
                {[6, 12, 8, 18, 22, 10, 16, 24, 18, 12, 6, 14, 20, 16, 10, 6, 14, 18, 10, 6].map((h, i) => (
                  <span
                    key={i}
                    style={{
                      height: `${h}px`,
                      width: "2.5px",
                      backgroundColor: "#64748b",
                      borderRadius: "2px",
                      display: "inline-block",
                    }}
                  />
                ))}
              </div>
              <span style={{ fontSize: "11px", color: "#94a3b8" }}>0:12</span>
            </div>
          )}

          {/* Time & Read Checkmark */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: isOwn ? "flex-end" : "flex-start",
              gap: "4px",
              fontSize: "10.5px",
              color: "#64748b",
              marginTop: "4px",
            }}
          >
            <span>{message.time || "4:32 PM"}</span>
            {isOwn && <span style={{ color: "#38bdf8", fontWeight: "bold", letterSpacing: "-2px" }}>✓✓</span>}
          </div>
        </div>
      </div>
    </div>
  );
}