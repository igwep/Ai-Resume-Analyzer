// store/Slices/analysisSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AnalysisData {
  modelUsed: string;
  score: {
    title: string;
    value: number;
  };
  missingSkills: {
    title: string;
    value: string[];
  };
  suggestions: {
    title: string;
    value: string;
  };
}

interface AnalysisState {
  result: AnalysisData | null;
}

const initialState: AnalysisState = {
  result: null,
};

const analysisSlice = createSlice({
  name: "analysis",
  initialState,
  reducers: {
    setAnalysisResult(state, action: PayloadAction<AnalysisData>) {
      state.result = action.payload;
    },
    clearAnalysisResult(state) {
      state.result = null;
    },
  },
});

export const { setAnalysisResult, clearAnalysisResult } = analysisSlice.actions;
export default analysisSlice.reducer;
