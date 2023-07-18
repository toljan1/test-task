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
  name: "loadTickers",
  initialState: initialAuthor,
  reducers: {
    setAvailableTicker: (state, action: PayloadAction<Ticker[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.items = action.payload;
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
export const { setAvailableTicker, setLoaded, setError } =
  availableTickersSlice.actions;
