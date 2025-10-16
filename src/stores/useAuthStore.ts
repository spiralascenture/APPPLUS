import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@/interfaces";

type AuthState = {
  user: User | null;
  isLoggedIn: boolean;
  loginTimestamp: number | null;
  login: (userData: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      loginTimestamp: null,

      login: (userData) =>
        set({
          user: userData,
          isLoggedIn: true,
          loginTimestamp: Date.now(),
        }),

      logout: () =>
        set({
          user: null,
          isLoggedIn: false,
          loginTimestamp: null,
        }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
