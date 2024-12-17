import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./menuSlice.js";
import sidebarReducer from "./sidebarSlice.js";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    sidebar: sidebarReducer,
  },
});
