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
    <div className="px-8 pt-3 pb-6 bg-[#0b0f19]">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-4 px-5 py-3 bg-[#111827] border border-slate-800 rounded-full shadow-lg"
      >
        {/* Emoji Icon */}
        <button
          type="button"
          className="text-slate-400 hover:text-slate-200 cursor-pointer flex items-center transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          className="flex-1 bg-transparent border-none outline-none text-slate-200 placeholder-slate-500 text-sm py-1"
        />

        {/* Paperclip Icon */}
        <button
          type="button"
          className="text-slate-400 hover:text-slate-200 cursor-pointer flex items-center transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </button>

        {/* Neon Green Paper Plane Send Button */}
        <button
          type="submit"
          className="text-lime-400 hover:text-lime-300 cursor-pointer flex items-center justify-center transition-colors"
        >
          <svg className="w-6 h-6 rotate-45" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </form>
    </div>
  );
}