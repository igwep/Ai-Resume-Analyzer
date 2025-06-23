import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoaderState {
  isLoading: boolean;
  message?: string;
}

const initialState: LoaderState = {
  isLoading: false,
  message: "",
};
const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    startLoading(state, action: PayloadAction<string>) {
      state.isLoading = true;
      state.message = action.payload || "Loading…" ;
    },
    stopLoading(state) {
      state.isLoading = false;
      state.message = "";
    },
  },
});
export const { startLoading, stopLoading } = loaderSlice.actions;
export default loaderSlice.reducer;