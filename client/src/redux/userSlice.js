import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useAPI from "api/serviceApi";

export const postServey = createAsyncThunk(
  "user/postServey",
  async ({ options, userId, token }, thunkAPI) => {
    try {
      const response = await useAPI.postServey(options, userId, token);
      console.log("SERVEY", response);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

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
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postServey.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(postServey.rejected, (state, action) => {
      console.log("Post Servey Error", action.payload);
    });
  },
});

export const { getUser, deleteUserInfo } = userSlice.actions;

export default userSlice.reducer;
