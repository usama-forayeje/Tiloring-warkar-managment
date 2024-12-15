import { getFirebaseData } from "@/database/firebaseUtils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  newWork: [],
  isLoading: false,
  isError: false,
  error: null,
};

// Async action to fetch data from Firebase
export const getNewWork = createAsyncThunk("newWork/getNewWork", async () => {
  return await getFirebaseData("newWorks");
});

// Slice for state and actions
const newWorkSlice = createSlice({
  name: "newWork",
  initialState,
  reducers: {
    removeWork: (state, action) => {
      state.newWork = state.newWork.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNewWork.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getNewWork.fulfilled, (state, action) => {
        state.isLoading = false;
        state.newWork = action.payload;
      })
      .addCase(getNewWork.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export default newWorkSlice.reducer;
export const { removeWork } = newWorkSlice.actions;