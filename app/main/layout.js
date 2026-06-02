import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/navbar/Navbar";

// Current page = children -> react default pass children{parameter}
export default function MainLayout({ children }) {
  return (
    <ProtectedRoute>
      <Navbar />
      {children}
    </ProtectedRoute>
  );
}
