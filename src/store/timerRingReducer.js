import { createSlice } from "@reduxjs/toolkit";

const radius =
parseFloat(getComputedStyle(document.documentElement).fontSize) * 16;
const circleCirc = 2 * Math.PI * radius;

const initialTimerRingState = {
  transition: ``, 
  linePos: 1608.5,
};

const timerRingSlice = createSlice({
  name: "timerRing",
  initialState: initialTimerRingState,
  reducers: {
    playSkipAnimation(state) {
      // stroke-dashoffset 2s ease
      state.linePos = 0;
      state.transition = 'stroke-dashoffset 2s ease';
    },
    handleTransitionEnd(state) {
      state.transition = '';
      state.linePos = circleCirc;
      console.log('Ended');
    },
    startRing(state, action) {
      state.transition = `stroke-dashoffset ${action.payload}s linear`;
      state.linePos = 0;
    },
    pauseRing(state, action) {
      state.linePos = circleCirc * action.payload;
      state.transition = '';
    },
    resumeRing(state, action) {
      state.transition = `stroke-dashoffset ${action.payload}s linear`;
      state.linePos = 0;
    }
  }
});

export const timerRingActions = timerRingSlice.actions;
export default timerRingSlice.reducer;