"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ConversationItem from "./ConversationItem";
import { useChatStore } from "@/store/chat";
import { useAuthStore } from "@/store/auth";
import { apiRequest } from "@/lib/api";

const MOCK_CONVERSATIONS = [
  {
    _id: "user_123",
    participant: { _id: "user_123", name: "Albus", username: "@albus", avatar: "https://i.pravatar.cc/150?u=albus", isOnline: true },
    lastMessage: "ok, see you tomorrow 😊",
    time: "10:24 PM",
    unread: true,
    isPinned: true,
  },
  {
    _id: "user_456",
    participant: { _id: "user_456", name: "jeksona", username: "@jeksona", avatar: "https://i.pravatar.cc/150?u=jeksona", isOnline: false },
    lastMessage: "That sounds good!",
    time: "9:48 PM",
    readReceipt: true,
  },
  {
    _id: "user_789",
    participant: { _id: "user_789", name: "Mia", username: "@mia", avatar: "https://i.pravatar.cc/150?u=mia", isOnline: false },
    lastMessage: "📷 Photo",
    time: "8:32 PM",
    readReceipt: true,
  },
];

const formatUserToConversation = (u) => {
  const userObj = u.participant || u.user || u;
  const id = userObj._id || userObj.id;
  const displayName = userObj.name || userObj.fullname || userObj.fullName || userObj.username || "User";
  const username = userObj.username ? `@${userObj.username.replace(/^@/, "")}` : "";
  const avatar =
    userObj.avatar ||
    userObj.profilePic ||
    userObj.profilePicture ||
    userObj.image ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=1e293b&color=f8fafc`;

  return {
    _id: id,
    participant: {
      _id: id,
      name: displayName,
      username: username,
      bio: userObj.bio || "",
      avatar: avatar,
      isOnline: userObj.isOnline ?? true,
    },
    lastMessage: u.lastMessage?.text || u.lastMessage || userObj.bio || username || "Tap to start chatting",
    time: u.time || (u.updatedAt ? new Date(u.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "Online"),
    unread: u.unread || u.unreadCount > 0 || false,
    readReceipt: !u.unread && !u.unreadCount,
  };
};

export default function ConversationList() {
  const router = useRouter();
  const { conversations, setConversations } = useChatStore();
  const { user: currentUser } = useAuthStore();
  const [myAvatar, setMyAvatar] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRealUsersAndChats = async () => {
      setLoading(true);
      const userMap = new Map();

      try {
        if (currentUser?._id) {
          const profileRes = await apiRequest(`users/profile/${currentUser._id}`, "GET");
          if (profileRes?.success && profileRes?.data) {
            const me = profileRes.data;
            const myName = me.name || me.fullname || me.fullName || me.username || "Me";

            // Logged-in user ka real DP set karo
            setMyAvatar(
              me.avatar ||
              me.profilePic ||
              me.profilePicture ||
              me.image ||
              currentUser.avatar ||
              currentUser.profilePic ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(myName)}&background=1e293b&color=f8fafc`
            );

            // Followers aur Following list merge karo
            const followers = me.followers || [];
            const following = me.following || [];
            const allFriends = [...following, ...followers];

            for (const friend of allFriends) {
              if (friend && typeof friend === "object" && friend._id && friend._id !== currentUser._id) {
                const formatted = formatUserToConversation(friend);
                userMap.set(formatted._id, formatted);
              }
            }
          }
        }

        try {
          const chatRes = await apiRequest("chat/conversations", "GET");
          const chatList = chatRes?.data || chatRes?.conversations || [];
          if (Array.isArray(chatList)) {
            for (const conv of chatList) {
              const formatted = formatUserToConversation(conv);
              if (formatted._id && formatted._id !== currentUser?._id) {
                userMap.set(formatted._id, formatted);
              }
            }
          }
        } catch {
          // Ignore if chat/conversations endpoint is not ready
        }

        const realList = Array.from(userMap.values());

        if (realList.length > 0) {
          // setConversations([...realList, ...MOCK_CONVERSATIONS]);//DUMMY USER
          const realList = Array.from(userMap.values());
               setConversations(realList);
        } else {
          setConversations(MOCK_CONVERSATIONS);
        }
      } catch (error) {
        console.error("Error loading real friends:", error);
        setConversations(MOCK_CONVERSATIONS);
      } finally {
        setLoading(false);
      }
    };

    fetchRealUsersAndChats();
  }, [currentUser, setConversations]);

  // Fallback DP agar API load hone se pehle authStore mein photo ho
  const displayAvatar =
    myAvatar ||
    currentUser?.avatar ||
    currentUser?.profilePic ||
    currentUser?.profilePicture ||
    currentUser?.image ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser?.name || currentUser?.username || "Me")}&background=1e293b&color=f8fafc`;

  const filteredConversations = conversations.filter((conv) => {
    const name = conv.participant?.name || "";
    const username = conv.participant?.username || "";
    const query = searchQuery.toLowerCase();
    return name.toLowerCase().includes(query) || username.toLowerCase().includes(query);
  });

  return (
    <div className="flex flex-col h-full bg-[#0b0f19] select-none p-3">
      {/* Top Bar: Logged-in User DP + Search Input */}
      <div className="px-3 pt-2 pb-4 flex items-center gap-3.5">
        <img
          src={displayAvatar}
          alt="My Profile"
          title="View my profile"
          onClick={() => currentUser?._id && router.push(`/main/profile/${currentUser._id}`)}
          className="w-9 h-9 rounded-full object-cover shrink-0 border border-slate-700 cursor-pointer hover:border-lime-400 transition-colors bg-slate-800"
        />
        <div className="relative flex-1 flex items-center">
          <input
            type="text"
            placeholder="Search name or @username"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2.5 pl-4 pr-10 text-sm bg-[#131b2e] border border-slate-800/80 rounded-full text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-600"
          />
          <svg
            className="absolute right-3.5 w-4 h-4 text-slate-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Messages & Pinned Header */}
      <div className="px-3 py-3 flex items-center justify-between">
        <span className="text-xl font-bold text-white tracking-tight">Messages</span>
        <span className="text-xs font-medium text-slate-500">pinned</span>
      </div>

      {/* Friends / Conversations Scrollable List */}
      <div className="flex-1 overflow-y-auto px-1 py-1 space-y-1.5">
        {loading ? (
          <div className="flex items-center justify-center h-32 text-slate-500 text-sm">
            Loading friends...
          </div>
        ) : filteredConversations.length > 0 ? (
          filteredConversations.map((conv) => (
            <ConversationItem key={conv._id || conv.id} conversation={conv} />
          ))
        ) : (
          <div className="flex items-center justify-center h-32 text-slate-500 text-sm">
            No friends found
          </div>
        )}
      </div>
    </div>
  );
}