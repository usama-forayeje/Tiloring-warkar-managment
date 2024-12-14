import { getFirebaseData } from "@/database/firebaseUtils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  newWork: [],
  isLoading: false,
  isError: false,
  error: null,
};

export const getNewWork = createAsyncThunk("newWork/getNewWork", async () => {
  let data = await getFirebaseData("newWorks");


  return data;
});

const newWorkSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNewWork.pending, (state, action) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(getNewWork.fulfilled, (state, action) => {
      state.isLoading = false;
      state.newWork = (action.payload);
      
    });
    builder.addCase(getNewWork.rejected, (state, action) => {
      state.isError = true;
      state.error = action.payload.error?.message;
    });
  },
});

export default newWorkSlice.reducer;
