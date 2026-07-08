import { create } from "zustand";
import { resetSocket } from "@/lib/socket";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: true,
  //isLoading = true means "user is yet not logged in may be in process of it ..  show isloading .... ui "

  setAuth: (user, token) => set({ user, token, isLoading: false }),
  logout: () => {
    resetSocket();
    set({ user: null, token: null, isLoading: false });
  },
  setLoading: (val) => set({ isLoading: val }),
}));

//usage reminder ...
// const { setAuth } = useAuthStore.getState();
// setAuth(res.user, res.accessToken);
