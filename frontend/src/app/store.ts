// libraries
import { configureStore } from "@reduxjs/toolkit";

// redux
import contentReducer from "../features/content-slice";

export const store = configureStore({
    reducer: {
        contentStore: contentReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RouteState = ReturnType<typeof store.getState>;
