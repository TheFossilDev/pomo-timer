import React, { useState } from "react";

import Timer from "./Components/Timer";
import SetTimer from "./Components/SetTimer";
import styles from "./App.module.css";

const App = () => {
  // pomodor.io url?

  // TODO: Feature list
  /*
  Diversions:
  1. Timer broke, needed to make one
  2. Didn't update, state issues (took a while)
  */
  // 1. Set timer duration
  // 2. Work mode, short break
  // 3. Auto advance / auto repeat
  // 4. Long break
  // 5. Basic UI styling

  const [isSetting, changeIsSetting] = useState(false);
  // Data: 
  // timerType: "work", "rest"(small), "break"(long)
  const [timerData, setTimerData] = useState({
    timerType: "work",
    pomosCompleted: 0,
    workMinutes: 25,
    shortBreakMinutes: 5,
    longBreakMinutes: 30,
    currentMinutes: 25,
  });

  const updateTimes = (times) => {
    setTimerData(times);
  };

  return (
    <div className={styles.flexContainer}>
      <h3>Pomodoro Timer</h3>
      {isSetting && (
        <SetTimer
        minutesData={timerData}
        setMinutesData={updateTimes}
        changeIsSetting={changeIsSetting}
        />
      )}
      <Timer
        timerData={timerData}
        setTimerData={setTimerData}
        changeIsSetting={changeIsSetting}
        isSetting={isSetting}
      />
    </div>
  );
};

export default App;
