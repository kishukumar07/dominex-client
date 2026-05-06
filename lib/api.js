const BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export const apiRequest = async (endpoint, method, data) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  return res.json();
};
