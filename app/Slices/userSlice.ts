// store/userSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/Firebase";

// Async thunk to fetch user data by Clerk ID

export const fetchFirebaseUser = createAsyncThunk(
  "user/fetchFirebaseUser",
  async (userId: string) => {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      throw new Error("User not found in Firestore");
    }

    const data = userSnap.data();

    // Convert any Timestamp fields to strings (or Date if you prefer)
    return {
      ...data,
      createdAt: data.createdAt?.toDate().toISOString() ?? null,
      updatedAt: data.updatedAt?.toDate().toISOString() ?? null,
    };
  }
);

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
    clearUser: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFirebaseUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFirebaseUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchFirebaseUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
