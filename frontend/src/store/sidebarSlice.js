import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collapsed: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleCollapsed: (state) => {
      state.collapsed = !state.collapsed;
    },
    setCollapsed: (state, action) => {
      state.collapsed = action.payload;
    },
  },
});

export const { toggleCollapsed, setCollapsed } = sidebarSlice.actions;
export default sidebarSlice.reducer;
