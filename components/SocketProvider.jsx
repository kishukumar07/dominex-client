// SocketProvider.jsx
"use client";
import { useEffect } from "react";
import { getSocket, resetSocket } from "@/lib/socket";
import { useAuthStore } from "@/store/auth";

export default function SocketProvider({ children }) {
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) {
      resetSocket();
      return;
    }

    const socket = getSocket();
    // pass auth token/userId so server can identify + join rooms
    // socket.auth = { userId: user.id, token: user.token };
    socket.connect();
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    return () => {
      // cleanup listeners on unmount, but don't disconnect here
      socket.off("connect");
    };
  }, [user]);

  return children;
}
