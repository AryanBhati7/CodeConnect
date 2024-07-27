import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    authStatus: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.authStatus = true;
    },
    logout: (state, action) => {
      state.user = null;
      state.authStatus = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
