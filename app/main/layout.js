import ProtectedRoute from "@/components/ProtectedRoute";
import React from "react";

// Current page = children -> react default pass children{parameter}
export default function MainLayout({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
