import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./Slices/LoaderSlice";
import analysisReducer from "./Slices/analysisSlice";
import modalReducer from "./Slices/modalSLice";
import userReducer from "./Slices/userSlice";

export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    analysis: analysisReducer,
    modal: modalReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
  ignoredPaths: ["user.data.createdAt"],
  ignoredActionPaths: ["payload.createdAt"],
} 
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
