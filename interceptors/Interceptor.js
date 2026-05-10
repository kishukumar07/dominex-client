//can also be ...
//├── interceptors/
//│   └──-> lib/api.js -> axiosInterceptor.js  -> lib/api.js || window.location.href("/login")
import { useAuthStore } from "@/store/auth";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

const fetchInterceptor = async (res, endpoint, method, data) => {
  
  // skip interception for auth routes
  if (endpoint.includes("auth")) {
    return res.json();
  }
  // access token expired
  if (res.status === 401) {
    const refRes = await fetch(`${BASE_URL}/api/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    // refresh token failed
    if (!refRes.ok) {
      useAuthStore.getState().logout();
      window.location.href = "/auth/login";
      return;
    }

    const refreshData = await refRes.json();

    // save new token
    useAuthStore
      .getState()
      .setAuth(useAuthStore.getState().user, refreshData.accessToken);

    // retry original request
    const retryRes = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshData.accessToken}`,
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    if (!retryRes.ok) throw new Error("Request failed after token refresh");
    return retryRes.json();
  }

  return res.json();
};

export default fetchInterceptor;
