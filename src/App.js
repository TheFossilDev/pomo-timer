import React, { useState, useEffect } from "react";

import Timer from "./Components/Timer";
import SetTimer from "./Components/SetTimer";
import styles from "./App.module.css";
import Modal from "./Components/UI/Modal";
import './assets/PomoTimer.mp3';

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
  const [headerLabel, setHeaderLabel] = useState("Pomodoro Timer")

  const fetchFromAppStorage = (key, backupValue) => {
    const value = localStorage.getItem(key);
    if (value != null && value != undefined) {
      // Has entry
      console.log('Had entry');
      console.log(value);
      return +value;
    } else {
      // No entry yet
      console.log('No entry');
      return backupValue;
    }
  }
  const fetchAutoStartData = (backupValue) => {
    const value = localStorage.getItem("autoStart");
    if (value != null && value != undefined) {
      // Has entry
      console.log('Had entry');
      console.log(value);
      return value === 'true';
    } else {
      // No entry yet
      console.log('No entry');
      return backupValue;
    }
  }


  // Data:
  // timerType: "work", "rest"(small), "break"(long)
  const [timerData, setTimerData] = useState({
    timerType: "work",
    isActive: false,
    autoStart: fetchAutoStartData(false),
    pomosCompleted: 0,
    workMinutes: fetchFromAppStorage("workMinutes", 25),
    restMinutes: fetchFromAppStorage("restMinutes", 5),
    breakMinutes: fetchFromAppStorage("breakMinutes", 30),
    currentMinutes: fetchFromAppStorage("workMinutes", 25),
  });

  const modalClickHandler = () => {
    changeIsSetting(false);
  };

  useEffect(() => {
    if (timerData.pomosCompleted === 0 && !timerData.isActive) return;
    switch (timerData.timerType) {
      case "work":
        setHeaderLabel(`Pomodoro #${timerData.pomosCompleted + 1}`);
        break;
      case "rest":
        setHeaderLabel("Short Break");
        break;
      case "break":
        setHeaderLabel("Long Break");
        break;
      default:
        setHeaderLabel("Broken!");
    }
  }, [timerData.timerType, timerData.isActive, timerData.pomosCompleted])
  

  return (
    <>
      {isSetting && (
        <Modal clickHandler={modalClickHandler}>
          <SetTimer
            timerData={timerData}
            setTimerData={setTimerData}
            changeIsSetting={changeIsSetting}
          />
        </Modal>
      )}
      <div
        className={`${styles["mainContainer"]} ${styles[timerData.timerType]}`}
      >
        <h3 className={styles.title}>{headerLabel}</h3>
        <Timer
          timerData={timerData}
          setTimerData={setTimerData}
          changeIsSetting={changeIsSetting}
          isSetting={isSetting}
        />
      </div>
    </>
  );
};

export default App;
