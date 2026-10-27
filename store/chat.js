// zustand store for storing message, active room 
import { create } from "zustand";

export const useChatStore = create((set, get) => ({
  conversations: [],
  currentChatUser: null,
  messages: [],
  onlineUsers: [],
  loading: false,

  // Actions
  setConversations: (conversations) => set({ conversations }),
  
  setCurrentChatUser: (user) => set({ currentChatUser: user }),

  setMessages: (messages) => set({ messages }),

  addMessage: (message) => 
    set((state) => ({ messages: [...state.messages, message] })),

  setOnlineUsers: (users) => set({ onlineUsers: users }),

  // Naya message aane par conversation list update karne ke liye
  updateConversationLastMessage: (userId, message) => {
    set((state) => ({
      conversations: state.conversations.map((conv) => 
        conv._id === userId || conv.participant?._id === userId
          ? { ...conv, lastMessage: message, updatedAt: new Date() }
          : conv
      ),
    }));
  },
}));