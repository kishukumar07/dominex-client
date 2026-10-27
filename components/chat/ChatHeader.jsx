//ChatHeader at top of Chat Window {avtar + name + online/typing{featured...} }

"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function ChatHeader({ user, isOnline, typingText }) {
  const router = useRouter();

  if (!user) return null;

  const userId = user._id || user.id;

  const handleProfileClick = () => {
    if (userId) {
      router.push(`/main/profile/${userId}`);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 24px",
        borderBottom: "1px solid #1e293b",
        backgroundColor: "#0b0f19",
      }}
    >
      {/* Clickable User Profile Info */}
      <div
        onClick={handleProfileClick}
        title="Click to view profile"
        style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}
      >
        <div style={{ position: "relative" }}>
          <img
            src={user.avatar || "https://i.pravatar.cc/150?u=albus"}
            alt={user.name}
            style={{ width: "42px", height: "42px", borderRadius: "50%", objectFit: "cover", display: "block" }}
          />
          <span
            style={{
              position: "absolute",
              bottom: "0px",
              right: "0px",
              width: "11px",
              height: "11px",
              backgroundColor: "#84cc16",
              border: "2px solid #0b0f19",
              borderRadius: "50%",
            }}
          />
        </div>
        <div>
          <h3 style={{ fontWeight: "600", fontSize: "15px", color: "#f8fafc", margin: 0 }}>{user.name || "Albus"}</h3>
          <p style={{ fontSize: "12px", color: "#94a3b8", margin: "2px 0 0 0" }}>
            {typingText ? "typing..." : isOnline !== false ? "Active now" : "Offline"}
          </p>
        </div>
      </div>

      {/* Right Call, Video & Menu Buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {[
          "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
          "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
          "M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z",
        ].map((pathData, idx) => (
          <button
            key={idx}
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              backgroundColor: "#131b2e",
              border: "1px solid #1e293b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#cbd5e1",
              cursor: "pointer",
            }}
          >
            <svg style={{ width: "18px", height: "18px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d={pathData} />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}