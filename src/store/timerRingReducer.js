import { createSlice } from "@reduxjs/toolkit";

const initialTimerRingState = {
  transition: ``, 
  linePos: 0,
};

const timerRingSlice = createSlice({
  name: "timerRing",
  initialState: initialTimerRingState,
  reducers: {
    playSkipAnimation(state) {

    },
    startRing(state) {
      
    },
    pauseRing(state) {

    },
    resumeRing(state) {

    }
  }
});

export const timerRingActions = timerRingSlice.actions;
export default timerRingSlice.reducer;