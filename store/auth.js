import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: true,
  //isLoading = true means "user is yet not logged in may be in process of it ..  show isloading .... ui "

  setAuth: (user, token) => set({ user, token, isLoading: false }),
  logout: () => set({ user: null, token: null, isLoading: false }),
  setLoading: (val) => set({ isLoading: val }),
}));

//usage reminder ...
// const { setAuth } = useAuthStore.getState();
// setAuth(res.user, res.accessToken);
