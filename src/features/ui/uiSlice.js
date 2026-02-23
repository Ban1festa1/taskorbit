import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "dark",
  view: "grid",
  query: "",
  status: "all",
  priority: "all",
  category: "all",
  sort: "updatedAt_desc",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
    setView(state, action) {
      state.view = action.payload;
    },
    setQuery(state, action) {
      state.query = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setPriority(state, action) {
      state.priority = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    resetFilters(state) {
      state.query = "";
      state.status = "all";
      state.priority = "all";
      state.category = "all";
      state.sort = "updatedAt_desc";
    },
  },
});

export const {
  setTheme,
  setView,
  setQuery,
  setStatus,
  setPriority,
  setCategory,
  setSort,
  resetFilters,
} = uiSlice.actions;

export default uiSlice.reducer;
