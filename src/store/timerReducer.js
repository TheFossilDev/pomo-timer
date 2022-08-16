import { createSlice } from "@reduxjs/toolkit";
import timerChime from "../assets/timerChime.mp3";

const fetchFromAppStorage = (key, backupValue) => {
  const value = localStorage.getItem(key);
  if (value !== null && value !== undefined) {
    return value;
  } else {
    return backupValue;
  }
};

const initialTimerState = {
  timerType: fetchFromAppStorage("timerType", "work"),
  // Timer states: ready (not started), running, paused
  timerState: fetchFromAppStorage("timerState", "ready"),
  autoStart: fetchFromAppStorage("autoStart", false) === "true",
  pomosCompleted: +fetchFromAppStorage("pomosCompleted", 0),
  workMinutes: +fetchFromAppStorage("workMinutes", 25),
  restMinutes: +fetchFromAppStorage("restMinutes", 5),
  breakMinutes: +fetchFromAppStorage("breakMinutes", 30),
  minutes: +fetchFromAppStorage("minutes", 25),
  seconds: +fetchFromAppStorage("seconds", 0),

  timerLabel: "Pomo Timer",
  spaceEnable: true,
};

const timerSlice = createSlice({
  name: "timer",
  initialState: initialTimerState,
  reducers: {
    advanceTimer(state) {
      if (!state.autoStart) {
        state.timerState = "ready";
      } else {
        state.timerState = "running";
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
      localStorage.setItem("timerState", "running");
      state.timerState = "running";
      state.timerLabel = "Timer Started!";
    },

    pause(state) {
      localStorage.setItem("timerState", "paused");
      state.timerState = "paused";
    },

    resume(state) {
      localStorage.setItem("timerState", "running");
      state.timerState = "running";
    },

    skip(state) {
      timerSlice.caseReducers.advanceTimer(state);
    },

    flipAutoStart(state) {
      localStorage.setItem("autoStart", !state.autoStart);
      state.autoStart = !state.autoStart;
    },

    setTimerSettings(state, action) {
      state.workMinutes = action.payload.newWorkMinutes;
      state.restMinutes = action.payload.newRestMinutes;
      state.breakMinutes = action.payload.newBreakMinutes;

      if (state.timerState === "ready") {
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
      localStorage.setItem("timerType", "work");
      localStorage.setItem("timerState", "ready");
      localStorage.setItem("pomosCompleted", 0);
      localStorage.setItem("workMinutes", 25);
      localStorage.setItem("restMinutes", 5);
      localStorage.setItem("breakMinutes", 30);
      localStorage.setItem("minutes", 25);
      localStorage.setItem("seconds", 0);

      state.timerType = "work";
      state.timerState = "ready";
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
          const audio = new Audio(timerChime);
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
    setTimerLabel(state) {
      state.timerLabel = `${state.timerType === "work" ? "Work:" : "Break:"} ${
        state.minutes
      }:${state.seconds >= 10 ? state.seconds : `0${state.seconds}`}`;
    },

    flipSpaceEnable(state) {
      state.spaceEnable = !state.spaceEnable;
    }
  },
});

export const timerActions = timerSlice.actions;
export default timerSlice.reducer;
