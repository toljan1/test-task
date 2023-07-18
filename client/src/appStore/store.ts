/* eslint-disable import/no-cycle */
import { configureStore } from "@reduxjs/toolkit";
import TickersReducer from "../features/TickersSlice";
import UserTickersReducer from "../features/UserTickersSlice";

export const store = configureStore({
  reducer: {
    availableTickers: TickersReducer,
    userTickers: UserTickersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
