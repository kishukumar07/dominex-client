import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: true,

  setAuth: (user, token) => set({ user, token, isLoading: false }),
  logout: () => set({ user: null, token: null, isLoading: false }),
}));

//usage reminder ...
// const { setAuth } = useAuthStore.getState();
// setAuth(res.user, res.accessToken);
