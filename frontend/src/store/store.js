import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./menuSlice.js";
import sidebarReducer from "./sidebarSlice.js";
import employeesReducer from "./employeesSlice.js";
import userReducer from "./userSlice.js";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    sidebar: sidebarReducer,
    employees: employeesReducer,
    user: userReducer,
  },
});
