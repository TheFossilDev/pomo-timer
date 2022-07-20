import { createSlice } from "@reduxjs/toolkit";
import PomoSound from "../assets/PomoTimer.mp3";

const fetchFromAppStorage = (key, backupValue) => {
  const value = localStorage.getItem(key);
  if (value !== null && value !== undefined) {
    return +value;
  } else {
    return backupValue;
  }
};
const fetchStringFromAppStorage = (key, backupValue) => {
  const value = localStorage.getItem(key);
  if (value !== null && value !== undefined) {
    return value;
  } else {
    return backupValue;
  }
};
const fetchAutoStartData = (backupValue) => {
  const value = localStorage.getItem("autoStart");
  if (value !== null && value !== undefined) {
    return value === "true";
  } else {
    return backupValue;
  }
};

const initialTimerState = {
  timerType: fetchStringFromAppStorage("timerType", "work"),
  isActive: fetchFromAppStorage("isActive", false),
  isRunning: fetchFromAppStorage("isRunning", false),
  autoStart: fetchAutoStartData(false),
  pomosCompleted: fetchFromAppStorage("pomosCompleted", 0),
  workMinutes: fetchFromAppStorage("workMinutes", 25),
  restMinutes: fetchFromAppStorage("restMinutes", 5),
  breakMinutes: fetchFromAppStorage("breakMinutes", 30),
  minutes: fetchFromAppStorage("minutes", 25),
  seconds: fetchFromAppStorage("seconds", 0),
};

const timerSlice = createSlice({
  name: "timer",
  initialState: initialTimerState,
  reducers: {
    advanceTimer(state) {
      if (!state.autoStart) {
        state.isRunning = false;
        state.isActive = false;
      }

      state.seconds = 0;
      // Decide on next section, then reset timer
      if (state.timerType !== "work") {
        state.timerType = "work";
        state.minutes = state.workMinutes;
        state.pomosCompleted++;
      } else {
        // Was a work period
        if (state.pomosCompleted % 4 === 0 && state.pomosCompleted > 0) {
          state.timerType = "break";
          state.minutes = state.breakMinutes;
        } else {
          state.timerType = "rest";
          state.minutes = state.restMinutes;
        }
      }
    },

    start(state) {
      state.isActive = true;
      state.isRunning = true;
    },

    flipIsRunning(state) {
      state.isRunning = !state.isRunning;
    },

    skip(state) {
      timerSlice.caseReducers.advanceTimer(state);
    },

    flipAutoStart(state) {
      state.autoStart = !state.autoStart;
    },

    setTimerSettings(state, action) {
      state.workMinutes = action.payload.newWorkMinutes;
      state.restMinutes = action.payload.newRestMinutes;
      state.breakMinutes = action.payload.newBreakMinutes;

      if (!state.isActive) {
        switch (state.timerType) {
          case "work":
            state.minutes = action.payload.newWorkMinutes;
            break;
          case "rest":
            state.minutes = action.payload.newRestMinutes;
            break;
          case "break":
            state.minutes = action.payload.newBreakMinutes;
            break;
          default:
            console.error("Set timer broke");
        }
      }
    },

    returnTimerToDefault(state) {
      state.timerType = "work";
      state.isActive = false;
      state.isRunning = false;
      state.autoStart = false;
      state.pomosCompleted = 0;
      state.workMinutes = 25;
      state.restMinutes = 5;
      state.breakMinutes = 30;
      state.minutes = 25;
      state.seconds = 0;
    },

    awareDecrease(state) {
      if (state.seconds - 1 < 0) {
        if (state.minutes - 1 < 0) {
          const audio = new Audio(PomoSound);
          audio.play();

          timerSlice.caseReducers.advanceTimer(state);
        } else {
          state.seconds = 59;
          state.minutes--;
        }
      } else {
        state.seconds--;
      }
    },
  },
});

export const timerActions = timerSlice.actions;
export default timerSlice.reducer;
