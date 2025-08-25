import { create } from "zustand";

const storeAuth = create((set) => ({
  token: null,
  user: null,
  login: (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    set({ token, user: userData });
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ token: null, user: null });
  },

  initialize: () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      set({ token, user });
    }
  },
}));

storeAuth.getState().initialize();

export default storeAuth;
