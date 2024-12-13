import { configureStore } from "@reduxjs/toolkit";
import newWorkSlice from "../features/newWork/newWorkSlice";

export const store = configureStore({
    reducer: {
        newWorks: newWorkSlice,
    },
});

export default store;