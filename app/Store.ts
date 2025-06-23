import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./Slices/LoaderSlice";
import analysisReducer from "./Slices/analysisSlice";

export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    analysis: analysisReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
