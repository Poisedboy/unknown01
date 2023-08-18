import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    googleToken: "",
    expiresIn: "",
  },
  reducers: {
    getToken: (state, action) => {
      state.googleToken = action.payload;
    },
    getUser: (state, action) => {
      state.user = action.payload;
    },
    getExpiresIn: (state, action) => {
      state.expiresIn = action.payload;
    },
  },
});

export const { getUser, getToken, getExpiresIn } = userSlice.actions;

export default userSlice.reducer;
