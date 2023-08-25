import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useAPI from "api/serviceApi";

export const postSprint = createAsyncThunk(
  "note-editor/postSprint",
  async ({ sprint, userId, token }, thunkAPI) => {
    try {
      await useAPI.uploadSprint(sprint, userId, token);
      return sprint;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const getSprints = createAsyncThunk(
  "note-editor/getSprints",
  async ({ userId, token }, thunkAPI) => {
    try {
      const response = await useAPI.fetchSprints(userId, token);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const updateSprint = createAsyncThunk(
  "note-editor/updateSprint",
  async ({ updatedSprint, token }, thunkAPI) => {
    try {
      const response = await useAPI.sendUpdatedSprint(updatedSprint, token);
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
      title: "",
      project: "",
      emotion: "",
    },
  },
  reducers: {
    updateCountWords: (state, action) => {
      state.sprint.countWords = action.payload;
    },
    setSprintId: (state, action) => {
      state.sprint.id = action.payload;
    },
    updateLocalSprint: (state, action) => {
      const existingIndex = state.sprints.findIndex(
        (i) => i.id === action.payload.id
      );
      state.sprints.splice(existingIndex, 1, {
        ...state.sprints[existingIndex],
        title: action.payload.title,
        emotion: action.payload.emotion,
      });
      // state.sprints[existingIndex].title = action.payload.title;
      // state.sprints[existingIndex].emtion = action.payload.emtion;
    },
    autoUpdateSprint: (state, action) => {
      state.sprint.content = action.payload.content;
    },
    inputSprintsText: (state, action) => {
      state.sprint.content = action.payload;
    },
    addMetaData: (state, action) => {
      const index = state.sprints.findIndex(
        (i) => i.id === action.payload.sprintId
      );
      const { title, project, emotion } = action.payload.form;
      state.sprint.title = title;
      state.sprint.project = project;
      state.sprint.emotion = emotion;
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
      state.sprint.duration = seconds <= 60 ? 1 : seconds / 60;
    },
    deleteSprint: (state, action) => {
      let newArray = state.sprints.filter(
        (sprint) => sprint.id !== action.payload.id
      );
      state.sprints = newArray;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postSprint.fulfilled, (state, action) => {
      state.sprints.push(action.payload);
    });
    builder.addCase(postSprint.rejected, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(getSprints.fulfilled, (state, action) => {
      state.sprints = action.payload;
    });
    builder.addCase(getSprints.rejected, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(updateSprint.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const {
  autoUpdateSprint,
  inputSprintsText,
  updateCountWords,
  updateLocalSprint,
  setSprintId,
  addMetaData,
  clearSprintData,
  calcDurationAndSpeed,
  deleteSprint,
} = noteEditorSlice.actions;

export default noteEditorSlice.reducer;
