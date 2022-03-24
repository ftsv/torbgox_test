import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WatchesState {
  date: {
    hours: number;
    minutes: number;
    seconds: number;
  }
  local: string;
  clocks: {timezone: string; name: string}[];
}
const localTimezone = (new Date()).getTimezoneOffset() / -60;
const local = localTimezone > 0 ? `+${localTimezone}`: `-${localTimezone}`;

const initialState: WatchesState = {
  date: {
    hours: 0,
    minutes: 0,
    seconds: 0,
  },
  local,
  clocks: [{timezone: local, name: 'Местное время'}],
}

export const watchesSlice = createSlice({
  name: 'watches',
  initialState,
  reducers: {
    
    watchesTimer (state ,action: PayloadAction) {
      const now = new Date();
      state.date.hours = now.getHours();
      state.date.minutes =  now.getMinutes();
      state.date.seconds = now.getSeconds();
    },
    addClocks: (state, action:PayloadAction<{timezone: string; name: string}>) => {
      state.clocks = [...state.clocks, action.payload];
    },
    changeClocks: (state, action:PayloadAction<{timezone: string; name: string; index: number;}>) => {
      const { index, timezone, name } = action.payload;
      state.clocks[index] = {timezone, name};
    }
  },
});

export default watchesSlice.reducer;