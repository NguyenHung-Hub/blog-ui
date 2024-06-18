"use client";
import React from "react";
import { Provider } from "react-redux";
import store from "./index";
import { hydrateUser } from "./reducer/user";
const getPostStateFromLocalStorage = (key: string) => {
  try {
    if (typeof window !== "undefined") {
      const persistedState = localStorage.getItem(key);
      if (persistedState) return JSON.parse(persistedState);
    }
  } catch (e) {
    console.log(e);
  }
};

const user = getPostStateFromLocalStorage("user");
if (user) {
  store.dispatch(hydrateUser(user));
}
const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default AppProvider;
