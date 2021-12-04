import create from "zustand";

export const useModalStore = create((set) => ({
  loginModalOpen: false,
  registerModalOpen: false,
  editModalOpen: false,
  openLoginModal: () => set((state) => ({ loginModalOpen: true })),
  openRegisterModal: () => set((state) => ({ registerModalOpen: true })),
  openEditModal: () => set((state) => ({ editModalOpen: true })),
  closeLoginModal: () => set((state) => ({ loginModalOpen: false })),
  closeRegisterModal: () => set((state) => ({ registerModalOpen: false })),
  closeEditModal: () => set((state) => ({ editModalOpen: false })),
}));

export const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set((state) => ({ user })),
  deleteUserTodo: (todoId) =>
    set((state) => {
      const todos = state.user.todos.filter((todo) => todo._id !== todoId);

      return {
        user: {
          ...state.user,
          todos: todos,
        },
      };
    }),

  addUserTodo: (todo) =>
    set((state) => {
      const todos = [...state.user.todos, todo];
      return {
        user: {
          ...state.user,
          todos: todos,
        },
      };
    }),

  editUserTodo: (id, new_text) => {
    set((state) => {
      const todos = state.user.todos.map((todo) =>
        todo._id === id ? { ...todo, text: new_text } : todo
      );
      return {
        user: {
          ...state.user,
          todos: todos,
        },
      };
    });
  },
}));

export const useSizeStore = create((set) => ({
  size: "1000px",
  setSize: (size) => set((state) => ({ size })),
}));
