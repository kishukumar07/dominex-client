//can also be ...
//├── interceptors/
//│   └──-> lib/api.js -> axiosInterceptor.js  -> lib/api.js || window.location.href("/login")
import { useAuthStore } from "@/store/auth";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

const fetchInterceptor = async (res, endpoint, method, data) => {
  // access token expired
  if (res.status === 401) {
    const refRes = await fetch(`${BASE_URL}/api/auth/refresh`, {
      method: "GET",
      credentials: "include",
    });

    // refresh token failed
    if (!refRes.ok) {
      useAuthStore.getState().logout();
      window.location.href = "/login";
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

    return retryRes.json();
  }

  return res.json();
};

export default fetchInterceptor;
