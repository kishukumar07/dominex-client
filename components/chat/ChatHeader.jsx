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

  const actionIcons = [
    "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
    "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
    "M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z",
  ];

  return (
    <div className="flex items-center justify-between px-8 py-4 border-b border-slate-800/80 bg-[#0b0f19]">
      {/* Clickable User Profile Info */}
      <div
        onClick={handleProfileClick}
        title="Click to view profile"
        className="flex items-center gap-4 cursor-pointer group"
      >
        <div className="relative">
          <img
            src={user.avatar || "https://i.pravatar.cc/150?u=albus"}
            alt={user.name}
            className="w-11 h-11 rounded-full object-cover block group-hover:opacity-90 transition-opacity"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-lime-400 border-2 border-[#0b0f19] rounded-full" />
        </div>
        <div>
          <h3 className="font-semibold text-base text-slate-50 group-hover:text-lime-400 transition-colors">
            {user.name || "Albus"}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {typingText ? "typing..." : isOnline !== false ? "Active now" : "Offline"}
          </p>
        </div>
      </div>

      {/* Right Call, Video & Menu Buttons */}
      <div className="flex items-center gap-3.5">
        {actionIcons.map((pathData, idx) => (
          <button
            key={idx}
            type="button"
            className="w-10 h-10 rounded-full bg-[#131b2e] border border-slate-700/70 flex items-center justify-center text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d={pathData} />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}