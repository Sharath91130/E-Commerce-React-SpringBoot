import { configureStore } from "@reduxjs/toolkit";
import countReducer from "../CartFeature/countSlice.js"; // Import default reducer

export const store = configureStore({
    reducer: {
        count: countReducer, // Register the reducer under the key 'count'
    },
});
