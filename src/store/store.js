import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./ThemeReducer";
import timerReducer from "./TimerReducer";

const store = configureStore({
  reducer: { timer: timerReducer, theme: themeReducer },
});

export default store;
