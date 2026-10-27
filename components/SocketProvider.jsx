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

    const socket = getSocket(); //this is creating the socket- connection at first only and in the next invocation of this will only return the pervious socket ...
     
    // pass auth token/userId so server can identify + join rooms
    // socket.auth = { userId: user.id, token: user.token };
    
    socket.connect();              
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    return () => {
      // cleanup listeners on unmount, but don't disconnect here
      socket.off("connect"); 
      //when this provider is cleaned up , remove the connect - listener from the socket . 
    };
  }, [user]);

  return children;
}
