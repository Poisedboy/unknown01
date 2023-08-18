import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useAPI from "api/serviceApi";

export const postSprint = createAsyncThunk(
  "note-editor/postSprint",
  async ({ sprint, userGoogleId }, thunkAPI) => {
    try {
      const response = await useAPI.uploadSprint(sprint, userGoogleId);
      console.log(response);
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const noteEditorSlice = createSlice({
  name: "note-editor",
  initialState: {
    sprints: [],
    sprint: {
      content: "",
      id: "",
      duration: 0,
      speed: 0,
      countWords: 0,
      metaData: {},
    },
  },
  reducers: {
    updateCountWords: (state, action) => {
      state.sprint.countWords = action.payload;
    },
    setSprintId: (state, action) => {
      state.sprint.id = action.payload;
    },
    // addSprint: (state, action) => {
    //   const existingIndex = state.sprints.findIndex(
    //     (i) => i.id === action.payload.id
    //   );
    //   if (existingIndex !== -1) {
    //     state.sprints[existingIndex] = action.payload;
    //   } else {
    //     state.sprints.push(action.payload);
    //   }
    // },
    autoUpdateSprint: (state, action) => {
      console.log(action.payload);
      state.sprint.content = action.payload.content;
    },
    inputSprintsText: (state, action) => {
      state.sprint.content = action.payload;
    },
    addMetaData: (state, action) => {
      const index = state.sprints.findIndex(
        (i) => i.id === action.payload.sprintId
      );
      state.sprint.metaData = action.payload.form;
    },
    clearSprintData: (state, action) => {
      state.sprint = {
        content: "",
        id: "",
        countWords: 0,
        metaData: {},
      };
    },
    calcDurationAndSpeed: (state, action) => {
      // const index = state.sprints.findIndex((i) => i.id === action.payload.id);
      const seconds = action.payload.duration;
      const newSpeed = (state.sprint.countWords / seconds) * 60;

      state.sprint.speed = newSpeed;
      state.sprint.duration = seconds <= 60 ? "< 1" : seconds / 60;
    },
    deleteSprint: (state, action) => {
      let newArray = state.sprints.filter(
        (sprint) => sprint.id !== action.payload.id
      );
      state.sprints = newArray;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postSprint.pending, (state, action) => {
      console.log("Posting Sprint on Server");
    });
    builder.addCase(postSprint.fulfilled, (state, action) => {
      console.log(state.sprints);
    });
    builder.addCase(postSprint.rejected, (state, action) => {
      console.log("Post Sprint Error", action.payload);
    });
  },
});

export const {
  autoUpdateSprint,
  inputSprintsText,
  updateCountWords,
  setSprintId,
  addMetaData,
  clearSprintData,
  calcDurationAndSpeed,
  deleteSprint,
} = noteEditorSlice.actions;

export default noteEditorSlice.reducer;
