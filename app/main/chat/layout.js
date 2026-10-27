// → shared layout for chat pages (if you add it)
import React from "react";
import ConversationList from "@/components/chat/ConversationList";

export default function ChatLayout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "calc(100vh - 64px)",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#0b0f19",
        color: "#e5e7eb",
        fontFamily: "sans-serif",
      }}
    >
      {/* Left Container: All Friends / Conversation List (Fixed 350px width) */}
      <aside
        style={{
          width: "350px",
          minWidth: "350px",
          maxWidth: "350px",
          height: "100%",
          borderRight: "1px solid #1e293b",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0b0f19",
        }}
      >
        <ConversationList />
      </aside>

      {/* Right Container: Active Chat Window */}
      <main
        style={{
          flex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          backgroundColor: "#0b0f19",
        }}
      >
        {children}
      </main>
    </div>
  );
}