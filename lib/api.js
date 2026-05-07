import { useAuthStore } from "@/store/auth";
import fetchInterceptor from "@/interceptors/interceptor";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export const apiRequest = async (endpoint, method, data) => {
  const token = useAuthStore.getState().token;

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  return fetchInterceptor(res, endpoint, method, data);
};
