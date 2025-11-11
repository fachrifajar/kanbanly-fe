import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthStore } from "../../interface";

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      isAuthenticated: () => get().user !== null,
    }),
    {
      name: "auth-storage",
    }
  )
);
