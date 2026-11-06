"use client";

import React, { useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";

export default function MessageList({ messages, currentUserId }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-4 bg-[#0b0f19]">
      {messages && messages.length > 0 ? (
        messages.map((msg, index) => (
          <MessageBubble
            key={msg._id || msg.id || index}
            message={msg}
            currentUserId={currentUserId}
          />
        ))
      ) : (
        <div className="flex items-center justify-center h-full text-slate-500 text-sm">
          No messages yet. Start the conversation!
        </div>
      )}
      <div ref={scrollRef} />
    </div>
  );
}