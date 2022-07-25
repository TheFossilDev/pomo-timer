import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeReducer";
import timerReducer from "./timerReducer";
import timerRingReducer from "./timerRingReducer";

const store = configureStore({
  reducer: { timer: timerReducer, theme: themeReducer, timerRing: timerRingReducer },
});

export default store;
