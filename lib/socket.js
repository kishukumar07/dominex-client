"use client";

// lib/socket.js
// Creates and exports a singleton Socket.io client instance.

// we can do this in be as well just for creation of socket instacnce there and then export and use it in other module ... {1. creating socket instance =>  exporting it via a function 3.using the prev. SocketInstance exporting a deisconnetSocket function ... }

// Frontend connects to backend via NEXT_PUBLIC_SERVER_BASE_URL —
// same port as Express (4500). Socket.io upgrades HTTP → WebSocket on first io() call.
// autoConnect: false → connect manually when user opens chat, not on app load.
// resetSocket() → call on logout to cleanly remove all listeners and disconnect.

//Important note :  calling getSocket() in a component only gets the instance at first it is callled by the SocketProvider ( The provider’s socket.connect() starts the connection. )

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
  } //fe-socket instance connected to the bE socket via url

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
