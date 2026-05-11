"use client";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";

function LogoutBtn() {
  const { logout } = useAuthStore();
  const router = useRouter();

  const handelLogout = async () => {
    try {
      await apiRequest("api/auth/logout", "POST");
    } finally {
      logout();
      router.replace("/auth/login");
    }
  };

  return <button className="btn btn-ghost" onClick={handelLogout}>Logout</button>;
}

export default LogoutBtn;
