import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createOpen: false,
  editTaskId: null,
};

const uiViewSlice = createSlice({
  name: "uiView",
  initialState,
  reducers: {
    openCreateTask(state) {
      state.createOpen = true;
      state.editTaskId = null;
    },
    closeCreateTask(state) {
      state.createOpen = false;
    },
    openEditTask(state, action) {
      state.createOpen = true;
      state.editTaskId = action.payload;
    },
    closeEditTask(state) {
      state.createOpen = false;
      state.editTaskId = null;
    },
  },
});

export const { openCreateTask, closeCreateTask, openEditTask, closeEditTask } =
  uiViewSlice.actions;
export default uiViewSlice.reducer;
