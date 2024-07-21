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
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
