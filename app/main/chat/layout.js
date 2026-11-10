// → shared layout for chat pages (if you add it)
import React from "react";
import ConversationList from "@/components/chat/ConversationList";

export default function ChatLayout({ children }) {
  return (
    <div className="flex flex-row h-[calc(100vh-4rem)] w-full overflow-hidden bg-[#0b0f19] text-gray-200 font-sans">
      {/* Left Container: All Friends / Conversation List */}
      <aside className="w-[350px] min-w-[350px] max-w-[350px] h-full border-r border-slate-800 flex flex-col bg-[#0b0f19] shrink-0">
        <ConversationList />
      </aside>

      {/* Right Container: Active Chat Window */}
      <main className="flex-1 h-full flex flex-col overflow-hidden bg-[#0b0f19]">
        {children}
      </main>
    </div>
  );
}