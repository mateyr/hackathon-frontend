import { AuthToken } from "@/utils/auth";
import { zustandStorage } from "@/utils/storage";
import { createSelectors } from "@/utils/zustand-selectors";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type IAuthStore = {
  isAuthenticated: boolean;
  token?: AuthToken;
  first_name?: string;
  last_name?: string;
  LogIn: (data: AuthToken & { first_name?: string; last_name?: string }) => void;
  LogOut: () => void;
};

export const useAuthStore = create<IAuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: undefined,
      first_name: undefined,
      last_name: undefined,
      LogIn: (data) => set({
        isAuthenticated: true,
        token: data,
        first_name: data.first_name,
        last_name: data.last_name
      }),
      LogOut: () => {
        set({ isAuthenticated: false, token: undefined, first_name: undefined, last_name: undefined });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({ token: state.token, first_name: state.first_name, last_name: state.last_name }),
    }
  )
);

export const useAuth = createSelectors(useAuthStore);

export const signOut = () => useAuthStore.getState().LogOut();
export const signIn = (token: AuthToken) =>
  useAuthStore.getState().LogIn(token);
