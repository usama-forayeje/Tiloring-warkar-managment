import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogin: false,
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logInUserRedux: (state, action) => {
            state.isLogin = true; // Update the isLogin flag
            state.user = action.payload; // Add user data
        },
        logOutUserRedux: (state) => {
            state.isLogin = false; // Reset login status
            state.user = null; // Clear user data
        },
    },
});

export const { logInUserRedux, logOutUserRedux } = authSlice.actions;
export default authSlice.reducer;
