"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { useChatStore } from "@/store/chat";

export default function ConversationItem({ conversation }) {
  const router = useRouter();
  const params = useParams();
  const { setCurrentChatUser } = useChatStore();

  const participant = conversation.participant || conversation;
  const userId = participant._id || participant.id;
  const isActive = params?.userId === userId;

  const handleClick = () => {
    setCurrentChatUser(participant);
    router.push(`/main/chat/${userId}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-150 border-l-4 ${
        isActive
          ? "bg-[#192534] border-lime-400 shadow-sm"
          : "bg-transparent border-transparent border-b border-slate-800/40 hover:bg-[#131b2e]/70"
      }`}
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <img
          src={participant.avatar || "/avatar.png"}
          alt={participant.name}
          className="w-12 h-12 rounded-full object-cover block bg-slate-800"
        />
        {participant.isOnline && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-lime-400 border-2 border-[#0b0f19] rounded-full" />
        )}
      </div>

      {/* Info & Last Message */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5 truncate">
            <h4 className="font-semibold text-[15px] text-slate-100 truncate">
              {participant.name}
            </h4>
            {participant.username && (
              <span className="text-xs text-slate-500 truncate">
                {participant.username}
              </span>
            )}
          </div>
          <span className="text-xs text-slate-400 shrink-0 ml-2">
            {conversation.time || "10:24 PM"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <p
            className={`text-[13px] text-slate-400 truncate ${
              conversation.isTyping ? "italic text-slate-300" : "not-italic"
            }`}
          >
            {conversation.isTyping ? "Typing..." : conversation.lastMessage || "Say hello..."}
          </p>

          {/* Green Unread Dot OR Blue Double Checkmark */}
          {conversation.unread ? (
            <span className="w-2.5 h-2.5 bg-lime-400 rounded-full shrink-0 ml-3" />
          ) : conversation.readReceipt ? (
            <span className="text-xs text-sky-400 font-bold shrink-0 ml-3 tracking-tighter">
              ✓✓
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}