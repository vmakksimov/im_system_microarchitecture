import { configureStore } from "@reduxjs/toolkit";
import tablesReducer from "../features/tables/tables-slice";

export const store = configureStore({
    reducer: {
        tables: tablesReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;