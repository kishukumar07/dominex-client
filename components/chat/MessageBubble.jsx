//Single mesaage {sent/recieved styling...}
"use client";

import React from "react";

const WAVEFORM_BARS = [
  "h-1.5", "h-3", "h-2", "h-4", "h-5", "h-2.5", "h-4", "h-6", "h-4", "h-3",
  "h-1.5", "h-3.5", "h-5", "h-4", "h-2.5", "h-1.5", "h-3.5", "h-4", "h-2.5", "h-1.5"
];

export default function MessageBubble({ message, currentUserId }) {
  const senderId = message.sender?._id || message.sender || message.senderId;
  const isOwn = senderId === currentUserId;

  return (
    <div className="flex flex-col w-full">
      {/* Center "Today" Pill Badge */}
      {message.showDateBadge && (
        <div className="self-center mt-2 mb-4 px-4 py-1 bg-[#162032] text-slate-400 text-xs rounded-full">
          {message.dateBadgeLabel || "Today"}
        </div>
      )}

      <div
        className={`flex items-start gap-2.5 w-full ${
          isOwn ? "justify-end" : "justify-start"
        }`}
      >
        {/* Receiver Small Avatar */}
        {!isOwn && (
          <div className="w-8 shrink-0">
            {!message.hideAvatar && (
              <img
                src={message.senderAvatar || "https://i.pravatar.cc/150?u=albus"}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover block"
              />
            )}
          </div>
        )}

        {/* Bubble Box */}
        <div
          className={`max-w-[360px] rounded-2xl px-3.5 py-2.5 text-slate-100 shadow-md ${
            isOwn ? "bg-[#1a2b49]" : "bg-[#162032]"
          }`}
        >
          {/* Text Content */}
          {message.text && (
            <p className="m-0 text-[13.5px] leading-snug whitespace-pre-wrap break-words">
              {message.text}
            </p>
          )}

          {/* Rich Link / Image Card Preview */}
          {message.mediaCard && (
            <div className="mt-2 rounded-xl overflow-hidden bg-pink-100">
              <img
                src={message.mediaCard.image}
                alt="Preview"
                className="w-full h-44 object-cover block"
              />
            </div>
          )}

          {message.mediaCard?.title && (
            <div className="mt-2 font-semibold text-[13.5px] text-slate-50">
              {message.mediaCard.title}
            </div>
          )}

          {/* Audio / Voice Note Waveform */}
          {message.isAudio && (
            <div className="flex items-center gap-3 min-w-[230px] py-0.5">
              <button
                type="button"
                className="w-7 h-7 rounded-full bg-transparent text-slate-50 text-base cursor-pointer flex items-center justify-center hover:text-lime-400 transition-colors"
              >
                ▶
              </button>
              <div className="flex items-center gap-1 flex-1 h-6">
                {WAVEFORM_BARS.map((heightClass, i) => (
                  <span
                    key={i}
                    className={`${heightClass} w-0.5 bg-slate-500 rounded-full inline-block`}
                  />
                ))}
              </div>
              <span className="text-[11px] text-slate-400">0:12</span>
            </div>
          )}

          {/* Time & Read Checkmark */}
          <div
            className={`flex items-center gap-1 text-[10.5px] text-slate-500 mt-1 ${
              isOwn ? "justify-end" : "justify-start"
            }`}
          >
            <span>{message.time || "4:32 PM"}</span>
            {isOwn && <span className="text-sky-400 font-bold tracking-tighter">✓✓</span>}
          </div>
        </div>
      </div>
    </div>
  );
}