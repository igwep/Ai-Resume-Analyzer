// store/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { DocumentData } from "firebase/firestore";

interface UserState {
  data: DocumentData | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<DocumentData>) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    clearUser: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUserError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, clearUser, setUserLoading, setUserError } = userSlice.actions;
export default userSlice.reducer;
