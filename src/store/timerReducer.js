import { createSlice } from "@reduxjs/toolkit";
import PomoSound from "../assets/PomoTimer.mp3";

const radius =
parseFloat(getComputedStyle(document.documentElement).fontSize) * 16;
const circleCirc = 2 * Math.PI * radius;

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

// Localstorage enabled
// const initialTimerState = {
//   timerType: fetchStringFromAppStorage("timerType", "work"),
//   isActive: fetchFromAppStorage("isActive", false),
//   isRunning: fetchFromAppStorage("isRunning", false),
//   autoStart: fetchAutoStartData(false),
//   pomosCompleted: fetchFromAppStorage("pomosCompleted", 0),
//   workMinutes: fetchFromAppStorage("workMinutes", 25),
//   restMinutes: fetchFromAppStorage("restMinutes", 5),
//   breakMinutes: fetchFromAppStorage("breakMinutes", 30),
//   minutes: fetchFromAppStorage("minutes", 25),
//   seconds: fetchFromAppStorage("seconds", 0),
// };

const initialTimerState = {
  timerType: "work",
  // Timer states: ready (not started), running, paused
  timerState: "ready",
  autoStart: false,
  pomosCompleted: 0,
  workMinutes: 1,
  restMinutes: 1,
  breakMinutes: 1,
  minutes: 1,
  seconds: 0,

  transition: ``, 
  skipTransition: ``,
  linePos: circleCirc,
  skipLinePos: circleCirc,
  smoothOpacity: '100%',
  strokeFadeTransition: '',
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

      state.transition = ``
      state.smoothOpacity = '100%'
      
      state.seconds = 0;
      // Decide on next section, then reset timer
      if (state.timerType !== "work") {
        state.timerType = "work";
        timerSlice.caseReducers.startRing(state, state.workMinutes);
        state.minutes = state.workMinutes;
        state.pomosCompleted++;
      } else {
        // Was a work period
        if (state.pomosCompleted % 4 === 0 && state.pomosCompleted > 0) {
          state.timerType = "break";
          timerSlice.caseReducers.startRing(state, state.breakMinutes);
          state.minutes = state.breakMinutes;
        } else {
          state.timerType = "rest";
          timerSlice.caseReducers.startRing(state, state.restMinutes);
          state.minutes = state.restMinutes;
        }
      }
    },

    start(state) {
      state.timerState = "running";
    },

    pause(state) {
      state.timerState = "paused";
    },

    resume(state) {
      state.timerState = "running";
    },

    skip(state) {
      timerSlice.caseReducers.advanceTimer(state);
    },

    flipAutoStart(state) {
      state.autoStart = !state.autoStart;
      console.log(`Autostart is ${state.autoStart}`);
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
      state.timerState = "ready";
      state.autoStart = false;
      state.pomosCompleted = 0;
      state.workMinutes = 25;
      state.restMinutes = 5;
      state.breakMinutes = 30;
      state.minutes = 25;
      state.seconds = 0;
    },

    awareDecrease(state) {
      if (state.seconds - 1 < 1 && state.minutes - 1 < 0) {
        // timerSlice.caseReducers.hideRing(state);
        // state.strokeFade = true;
        state.transition = `stroke-opacity 1s linear`;
        state.smoothOpacity = '0%'
      } 
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

    /* ====================== TIMERRING SECTION ====================== */
    playSkipAnimation(state) {
      state.skipTransition = 'stroke-dashoffset 2s ease';
      state.skipLinePos = 0;
    },
    handleTransitionEnd(state) {
      


      // if (state.autoStart) {
      //   switch (state.timerType) {
      //     case "work":
      //       state.transition = `stroke-dashoffset ${state.workMinutes}s linear`;
      //       break;
      //     case "rest":
      //       state.transition = `stroke-dashoffset ${state.restMinutes}s linear`;
      //       break;
      //     case "break":
      //       state.transition = `stroke-dashoffset ${state.breakMinutes}s linear`;
      //       break;
      //     default:
      //       console.error("Timerring transition failed");
      //   }
      //   state.linePos = 0;
      // } else {
      //     state.transition = '';
      //     state.linePos = circleCirc;
      //     state.skipTransition = '';
      //     state.skipLinePos = circleCirc;
      // }
      // console.log('Ended');
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
    },
    hideRing(state) {
      state.transition = '';
      state.linePos = circleCirc;
    },
    showSmoothRing(state) {
      state.smoothOpacity = '100%'
      state.strokeFadeTransition = `stroke-opacity 1s linear`;
    },


  },
});

export const timerActions = timerSlice.actions;
export default timerSlice.reducer;
