import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    googleToken: "",
  },
  reducers: {
    getToken: (state, action) => {
      state.googleToken = action.payload;
    },
    getUser: (state, action) => {
      state.user = action.payload;
    },
    deleteUserInfo: (state, action) => {
      state.user = {};
      state.googleToken = "";
    },
  },
});

export const { getUser, getToken, deleteUserInfo } = userSlice.actions;

export default userSlice.reducer;
