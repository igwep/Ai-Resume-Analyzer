import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./Slices/LoaderSlice";
import analysisReducer from "./Slices/analysisSlice";
import modalReducer from "./Slices/modalSLice";

export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    analysis: analysisReducer,
    modal: modalReducer,
    
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
