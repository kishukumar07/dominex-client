"use client";

import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { apiRequest } from "@/lib/api";

function ProtectedRoute({ children }) {
  const { user, isLoading, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const res = await apiRequest("api/auth/refresh", "POST");
        if (res.success) {
          const userRes = await apiRequest("api/user/me", "GET");
          if (userRes.success) {
            setAuth(userRes.data, res.accessToken);
          } else {
            logout();
          }
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
  }, [user,logout]);

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

// userController.js future integration ...
// export const getMe = async (req, res) => {
//   try {
//     const user = await UserModel.findById(req.userId).select("-password -otp -otpExpire");
//     if (!user) return res.status(404).json({ success: false, message: "User not found" });
//     return res.status(200).json({ success: true, data: user });
//   } catch (err) {
//     return res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

