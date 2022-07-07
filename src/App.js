import React, { useState } from "react";

import Timer from "./Components/Timer";
import SetTimer from "./Components/SetTimer";
import styles from "./App.module.css";

const App = () => {
  // pomodor.io url?

  // TODO: Feature list
  // 1. Set timer duration
  // 2. Work mode, short break
  // 3. Auto advance / auto repeat
  // 4. Long break
  // 5. Basic UI styling

  const [isSetting, changeIsSetting] = useState(false);

  const time = new Date();
  const [workDurationOffset, setWorkDurationOffset] = useState(1500);
  const [shortBreakDurationOffset, setShortBreakDurationOffset] =
    useState(1500);
  const [longBreakDurationOffset, setLongBreakDurationOffset] = useState(1500);
  // Timer set
  time.setSeconds(time.getSeconds() + workDurationOffset);

  return (
    <div className={styles.flexContainer}>
      <h3>Pomodoro Timer</h3>
      {isSetting && (
        <SetTimer
        />
      )}
      <Timer
        expiryTimestamp={time}
        changeIsSetting={changeIsSetting}
        isSetting={isSetting}
      />
    </div>
  );
};

export default App;
