import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: { selectedKey: "dashboard" },
  reducers: {
    selectItem: (state, action) => {
      state.selectedKey = action.payload;
    },
  },
});

export const { selectItem } = menuSlice.actions;

export default menuSlice.reducer;
