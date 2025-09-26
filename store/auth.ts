import { AuthToken } from "@/utils/auth";
import { zustandStorage } from "@/utils/storage";
import { createSelectors } from "@/utils/zustand-selectors";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type IAuthStore = {
  isAuthenticated: boolean;
  token?: AuthToken;
  LogIn: (data: AuthToken) => void;
  LogOut: () => void;
};

export const useAuthStore = create<IAuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: undefined,
      LogIn: (token: AuthToken) => set({ isAuthenticated: true, token }),
      LogOut: () => {
        set({ isAuthenticated: false, token: undefined });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({ token: state.token }),
    }
  )
);

export const useAuth = createSelectors(useAuthStore);

export const signOut = () => useAuthStore.getState().LogOut();
export const signIn = (token: AuthToken) =>
  useAuthStore.getState().LogIn(token);
