import { configureStore } from "@reduxjs/toolkit";
import { tasksApi } from "./tasksApi.js";
import uiReducer from "../features/ui/uiSlice.js";
import uiViewReducer from "../features/ui/uiViewSlice.js";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    uiView: uiViewReducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksApi.middleware),
});
