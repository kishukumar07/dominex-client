/*
 chat/[userId]/page.jsx is a dynamic route. The brackets mean userId comes from the URL, so /main/chat/123 opens the conversation for user 123. That page can read the ID and load that conversation.

Import : 


*/
"use client";

import React from "react";
import { useParams } from "next/navigation";
import ChatWindow from "@/components/chat/ChatWindow";

export default function ChatPage() {
  const params = useParams();
  const userId = params?.userId;

  if (!userId) return null;

  return <ChatWindow userId={userId} />;
}