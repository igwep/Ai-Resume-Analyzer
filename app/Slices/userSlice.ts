import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { DocumentData } from "firebase/firestore";

interface UserState {
  data: DocumentData | null;
  userLoading: boolean;
  error: string | null;
  historyCount: number;
}

const initialState: UserState = {
  data: null,
  userLoading: false,
  error: null,
  historyCount: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<DocumentData>) => {
      const payload = action.payload;
      state.data = payload;
      state.userLoading = false;
      state.error = null;
      state.historyCount = payload.history ? Object.keys(payload.history).length : 0;
    },
    setHistoryCount: (state, action: PayloadAction<number>) => {
      state.historyCount = action.payload;
    },
    clearUser: (state) => {
      state.data = null;
      state.userLoading = false;
      state.error = null;
      state.historyCount = 0;
    },
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.userLoading = action.payload;
    },
    setUserError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setUser,
  clearUser,
  setUserLoading,
  setUserError,
  setHistoryCount,
} = userSlice.actions;

export default userSlice.reducer;
