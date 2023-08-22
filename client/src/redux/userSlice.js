import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
    },
    deleteUserInfo: (state, action) => {
      state.user = {};
      state.googleToken = "";
    },
  },
});

export const { getUser, deleteUserInfo } = userSlice.actions;

export default userSlice.reducer;
