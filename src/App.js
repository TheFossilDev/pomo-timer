import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Timer from "./Components/Timer";
import SetTimer from "./Components/SetTimer";
import styles from "./App.module.css";
import Modal from "./Components/UI/Modal";
import ConfirmationBox from "./Components/ResetData/ConfirmationBox";
import "./assets/PomoTimer.mp3";

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
  const [isConfirming, setIsConfirming] = useState(false);
  const [headerLabel, setHeaderLabel] = useState("Pomodoro Timer");
  const timerType = useSelector((state) => state.timer.timerType);
  const isActive = useSelector((state) => state.timer.isActive);
  const isRunning = useSelector((state) => state.timer.isRunning);
  const autoStart = useSelector((state) => state.timer.autoStart);
  const pomosCompleted = useSelector((state) => state.timer.pomosCompleted);
  const workMinutes = useSelector((state) => state.timer.workMinutes);
  const restMinutes = useSelector((state) => state.timer.restMinutes);
  const breakMinutes = useSelector((state) => state.timer.breakMinutes);
  const minutes = useSelector((state) => state.timer.minutes);
  const seconds = useSelector((state) => state.timer.seconds);

  // Sync progress to localstorage on each update
  useEffect(() => {
    localStorage.setItem("timerType", timerType);
    localStorage.setItem("isActive", isActive);
    localStorage.setItem("isRunning", isRunning);
    localStorage.setItem("autoStart", autoStart);
    localStorage.setItem("pomosCompleted", pomosCompleted);
    localStorage.setItem("workMinutes", workMinutes);
    localStorage.setItem("restMinutes", restMinutes);
    localStorage.setItem("breakMinutes", breakMinutes);
    localStorage.setItem("minutes", minutes);
    localStorage.setItem("seconds", seconds);
  }, [
    timerType,
    isActive,
    isRunning,
    autoStart,
    pomosCompleted,
    workMinutes,
    restMinutes,
    breakMinutes,
    minutes,
    seconds,
  ]);

  const flipIsConfirming = () => {
    setIsConfirming(!isConfirming);
  };

  const modalClickHandler = () => {
    changeIsSetting(false);
  };

  useEffect(() => {
    if (pomosCompleted === 0 && !isActive) {
      setHeaderLabel("Pomodoro Timer");
    } else {
      switch (timerType) {
        case "work":
          setHeaderLabel(`Pomodoro #${pomosCompleted + 1}`);
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
    }
  }, [timerType, isActive, pomosCompleted]);

  return (
    <>
      {isSetting && (
        <Modal clickHandler={modalClickHandler}>
          <SetTimer changeIsSetting={changeIsSetting} />
        </Modal>
      )}
      {isConfirming && (
        <ConfirmationBox flipIsConfirming={flipIsConfirming}></ConfirmationBox>
      )}
      <div className={`${styles["mainContainer"]} ${styles[timerType]}`}>
        <h3 className={styles.title}>{headerLabel}</h3>
        <Timer
          changeIsSetting={changeIsSetting}
          isSetting={isSetting}
          flipIsConfirming={flipIsConfirming}
        />
      </div>
    </>
  );
};

export default App;
