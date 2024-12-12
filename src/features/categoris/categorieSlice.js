// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     categories: [],
//     isLoading: false,
//     isError: false,
//     error: null,
// };

// export const getCategories = createAsyncThunk(
//     "categories/getCategories",
//     async () => {
//         let data = await getFirebaseData("categories");
//         return data;
//     }
// );

// const categoriesSlice = createSlice({
//     name: "categories",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addCase(getCategories.pending, (state, action) => {
//             state.isError = false;
//             state.isLoading = true;
//         });
//         builder.addCase(getCategories.fulfilled, (state, action) => {
//             state.isLoading = false;
//             state.categories = action.payload;
//         });
//         builder.addCase(getCategories.rejected, (state, action) => {
//             state.isError = true;
//             state.error = action.payload.error?.message;
//         });
//     },
// });

// export default categoriesSlice.reducer;