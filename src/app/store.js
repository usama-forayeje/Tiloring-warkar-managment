import { configureStore } from "@reduxjs/toolkit";
import newWorkSlice from "../features/newWork/newWorkSlice";
import authSlice from "../features/auth/authSlice";

export const store = configureStore({
    reducer: {
        newWorks: newWorkSlice,
        auth: authSlice,
    },
});

export default store;