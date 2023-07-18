import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Ticker } from "../types/Ticker";

type InitialState = {
  loaded: boolean;
  hasError: boolean;
  items: Ticker[];
};

const initialAuthor: InitialState = {
  loaded: false,
  hasError: false,
  items: [],
};

const availableTickersSlice = createSlice({
  name: "userTickers",
  initialState: initialAuthor,
  reducers: {
    setUserTicker: (state, action: PayloadAction<Ticker[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.items = action.payload;
    },
    setAddTicker: (state, action: PayloadAction<Ticker>) => {
      state.items = [...state.items, action.payload]
    },
    setDeleteTicker: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((tick) => action.payload !== tick.ticker)
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.loaded = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.hasError = action.payload;
    },
  },
});

export default availableTickersSlice.reducer;
export const { setUserTicker, setAddTicker, setDeleteTicker, setLoaded, setError } =
  availableTickersSlice.actions;
