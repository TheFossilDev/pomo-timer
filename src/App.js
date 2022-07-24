import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { themeActions } from "./store/themeReducer";

import Timer from "./Components/Timer";
import Button from "./Components/UI/Buttons/Button";
import SetTimer from "./Components/SetTimer";
import styles from "./App.module.css";
import Modal from "./Components/UI/Modal";
import ConfirmationBox from "./Components/ResetData/ConfirmationBox";
import "./assets/PomoTimer.mp3";
import deleteBlack from "./assets/deleteBlack.png";
import darkModeBlack from "./assets/darkModeBlack.png";

const App = () => {
  const dispatch = useDispatch();

  const [isSetting, changeIsSetting] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const [move, setMove] = useState(false);

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

  const darkMode = useSelector((state) => state.theme.darkMode);

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

  const setHandler = () => {
    changeIsSetting(!isSetting);
  };

  const flipIsConfirming = () => {
    setIsConfirming(!isConfirming);
  };

  const modalClickHandler = () => {
    changeIsSetting(false);
  };

  const darkModeClickHandler = () => {
    localStorage.setItem("darkMode", !darkMode);
    dispatch(themeActions.flipDarkMode());
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

  const movingHandler = () => {
    setMove(!move);
  }



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
      <div
        className={`${styles["mainContainer"]} ${
          darkMode ? styles["dark"] : styles["light"]
        } ${styles[timerType]}`}
      >
        <div
          className={`${styles["centerContainer"]} ${
            darkMode ? styles["dark"] : styles["light"]
          } ${styles[timerType]}`}
        >
          <header>
            <h3
              className={`${styles.title} ${
                darkMode ? styles["dark"] : styles["light"]
              }`}
            >
              {headerLabel}
            </h3>
            <Button
              size={"medium"}
              flex={true}
              onClick={setHandler}
              title={"Change timer lengths"}
            >
              Set
            </Button>
            <Button
              size={"medium"}
              flex={true}
              onClick={flipIsConfirming}
              title={"Reset your saved progress"}
            >
              <img src={deleteBlack} alt="Black trash can icon" />
            </Button>
            <Button
              title={"Change between light mode and dark mode"}
              onClick={darkModeClickHandler}
            >
              <img src={darkModeBlack} alt="Black cresent moon icon" />
            </Button>
            <Button
              onClick={movingHandler}
            >

            </Button>
          </header>
          <div id={styles.circle}>
          <svg
          id={styles["BarSvg"]}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <circle
              className={styles["BaseCircle"]}
              id={styles["BaseCircle"]}
              cx="50%"
              cy="50%"
              r="16rem"
            />

            <circle
              className={`${styles["ProgressCircle"]} ${move ? styles["fill"] : ""}`}
              id={styles["ProgressCircle"]}
              style={{transition: `stroke-dashoffset ${minutes * 60}s linear`}}
              cx="50%"
              cy="50%"
              r="16rem"
            />
          </g>
        </svg>
              <Timer
                changeIsSetting={changeIsSetting}
                isSetting={isSetting}
                flipIsConfirming={flipIsConfirming}
              />
            </div>
        </div>
      </div>
    </>
  );
};

export default App;
