"use client";

import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { apiRequest } from "@/lib/api";

function ProtectedRoute({ children }) {
  const { user, isLoading, logout, setAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const res = await apiRequest("api/auth/refresh", "POST");
        if (res.success) {
          setAuth(res.user, res.accessToken); // ← add this
        } else {
          logout();
        }
      } catch (err) {
        logout();
      }
    };

    if (!user) {
      bootstrap();
    } else {
      useAuthStore.getState().setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/auth/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) return <div className="page-center">Loading...</div>;
  if (!user) return null;

  return children;
}

export default ProtectedRoute;
