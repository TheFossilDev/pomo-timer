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
 /* TODO:
  1. Set timer duration
  2. Work mode, short break
    a. Input validation and timer adjustment handling
  3. Auto advance / auto repeat
  4. Long break
  5. Basic UI styling


  Nice to have's:
  * Functionality to adjust current timer instead of next timer
  */

  const [isSetting, changeIsSetting] = useState(false);
  // Data: 
  // timerType: "work", "rest"(small), "break"(long)
  const [timerData, setTimerData] = useState({
    timerType: "work",
    isActive: false,
    autoStart: false,
    pomosCompleted: 0,
    workMinutes: 25,
    restMinutes: 5,
    breakMinutes: 30,
    currentMinutes: 25,
  });
  // Debug data: 
  // const [timerData, setTimerData] = useState({
  //   timerType: "work",
  //   isActive: false,
  //   pomosCompleted: 2,
  //   workMinutes: 1,
  //   restMinutes: 1,
  //   breakMinutes: 2,
  //   currentMinutes: 1,
  // });

  return (
    <div className={`${styles["mainContainer"]} ${styles[timerData.timerType]}`}>
      <h3 className={styles.title}>Pomodoro Timer</h3>
      {isSetting && (
        <SetTimer
        timerData={timerData}
        setTimerData={setTimerData}
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
