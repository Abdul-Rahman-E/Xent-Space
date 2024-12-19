import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import usersData from "../sampleData/userData.js";

export const loginAsync = createAsyncThunk(
  "user/login",
  async ({ username, password }, { rejectWithValue }) => {
    const user = usersData.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      return user;
    } else {
      return rejectWithValue("Invalid username or password");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: usersData,
    currentUser: null,
  },
  reducers: {
    isAuthenticated(state) {
      console.log(state.currentUser || false);
      return state.currentUser || false;
    },
    logout(state) {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.currentUser = null;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
