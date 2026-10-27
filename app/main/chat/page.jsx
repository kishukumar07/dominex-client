/*

chat converation list : chat landing page < a Person opens the chatSystem and see conversation list and an empty state prompting the user to select a conversation.
  
Imported at : 

*/
"use client";

import React from "react";
import { useParams } from "next/navigation";
import ChatWindow from "@/components/chat/ChatWindow";

export default function UserChatPage() {
  const params = useParams();
  const userId = params?.userId;

  if (!userId) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Select a conversation to start chatting
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-[#0b0f19]">
      <ChatWindow userId={userId} />
    </div>
  );
}