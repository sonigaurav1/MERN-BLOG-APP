import { create } from "zustand";

export const useUsers = create((set) => ({
  users: [],
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  removeUser: (userId) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== userId),
    })),
  removeAllUsers: () => set({ users: [] }),
}));

