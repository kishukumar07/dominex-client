import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/navbar/Navbar";

import SocketProvider from "@/components/SocketProvider";

// Current page = children -> react default pass children{parameter}
export default function MainLayout({ children }) {
  return (
    <ProtectedRoute>
      <SocketProvider>
        <Navbar />
        {children}
      </SocketProvider>
    </ProtectedRoute>
  );
}

// ProtectedRoute is presumably what confirms the user is actually authenticated (redirecting unauthenticated users elsewhere). SocketProvider should only try to connect once that check has passed — so it sits inside, not above.
