import { createSlice } from "@reduxjs/toolkit";

const fetchBoolFromLocalStorage = (key, backupValue) => {
  const value = localStorage.getItem(key);
  if (value !== null && value !== undefined) {
    return value === "true";
  } else {
    return backupValue;
  }
};

const initialThemeState = {
  darkMode: fetchBoolFromLocalStorage("darkMode", false),
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialThemeState,
  reducers: {
    flipDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
  },
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;
