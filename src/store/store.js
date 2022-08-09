import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeReducer";
import timerReducer from "./timerReducer";

const store = configureStore({
  reducer: { timer: timerReducer, theme: themeReducer },
});

export default store;
