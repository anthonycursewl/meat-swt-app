import { create } from "zustand";

export const useGlobalState = create((set) => ({
    theme: "light",
    setTheme: (theme: any) => set({ theme }),
    CurrentAuthToken: null,
    setCurrentAuthToken: (CurrentAuthToken: any) => set({ CurrentAuthToken }),
}));