"use client";

import { io } from "socket.io-client";

let socketInstance = null;

export const getSocket = () => {
  if (typeof window === "undefined") {
    return null;
  }

  if (!socketInstance) {
    const serverUrl =
      process.env.NEXT_PUBLIC_SERVER_BASE_URL || window.location.origin;

    socketInstance = io(serverUrl, {
      withCredentials: true,
      autoConnect: false,
      transports: ["websocket"],
    });
  }

  return socketInstance;
};

export const resetSocket = () => {
  if (socketInstance) {
    socketInstance.removeAllListeners();
    socketInstance.disconnect();
  }

  socketInstance = null;
};

export default getSocket;
