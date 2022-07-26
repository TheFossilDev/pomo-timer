import styles from "./Timer.module.css";
import Button from "./UI/Buttons/Button";
import useTimer from "../hooks/useTimer";
import { useDispatch, useSelector } from "react-redux";
import { timerActions } from "../store/timerReducer";
import { timerRingActions } from "../store/timerRingReducer";
import { useState, useEffect } from "react";

import skipBlack from "../assets/skipNextBlack.png";
import fastForwardBlack from "../assets/fastForwardBlack.png";

const Timer = (props) => {
  const dispatch = useDispatch();
  const timerType = useSelector((state) => state.timer.timerType);
  const seconds = useSelector((state) => state.timer.seconds);
  const minutes = useSelector((state) => state.timer.minutes);
  const isRunning = useSelector((state) => state.timer.isRunning);
  const isActive = useSelector((state) => state.timer.isActive);

  const workMinutes = useSelector((state) => state.timer.workMinutes);
  const restMinutes = useSelector((state) => state.timer.restMinutes);
  const breakMinutes = useSelector((state) => state.timer.breakMinutes);

  const darkMode = useSelector((state) => state.theme.darkMode);

  
  useTimer();
  
  const [bigLabel, setBigLabel] = useState();

  const flipAutoStartHandler = () => {
    // localStorage.setItem("autoStart", !props.timerData.autoStart);
    dispatch(timerActions.flipAutoStart());
  };

  const getTimerTypeLabel = () => {
    switch (timerType) {
      case "work":
        return "Time for a work period!";
      case "rest":
        return "Time for a quick break!";
      case "break":
        return "Congrats! You earned a long break";
      default:
        return "whoops, defaulted";
    }
  };
  // Change timer label
  useEffect(() => {
    if (isActive) {
      if (isRunning) {
        setBigLabel("Pause");
      } else {
        setBigLabel("Resume");
      }
    } else {
      setBigLabel("Start");
    }
  }, [isActive, isRunning]);

  const timerChangeHandler = () => {
    // WHEN THE BUTTON GETS CLICKED
    if (isActive) {
      // Is active
      if (isRunning) {
        // Is running
        dispatch(timerActions.flipIsRunning());
        dispatch(timerRingActions.pauseRing(durationCompletedHelper()))
        // setBigLabel("Resume");
      } else {
        // Isn't running
        dispatch(timerActions.flipIsRunning());
        dispatch(timerRingActions.resumeRing(minutes * 60 + seconds));
        // setBigLabel("Pause");
      }
    } else {
      // Isn't running yet
      // setBigLabel("Pause");
      dispatch(timerActions.start());
      dispatch(
        timerRingActions.startRing(minutes * 60 + seconds)
      );
    }
  };

  const durationCompletedHelper = () => {
    switch (timerType) {
      case "work":
        console.log(`Work ratio: ${((minutes * 60) + seconds) / (workMinutes * 60)}`);
        return ((minutes * 60) + seconds) / (workMinutes * 60);
      case "rest":
        return ((minutes * 60) + seconds) / (restMinutes * 60);
      case "break":
        return ((minutes * 60) + seconds) / (breakMinutes * 60);
      default:
        console.error('Invalid timer type');
        break;
    }
  };

  const skipHandler = () => {
    props.flipIsSkipConfirming();
    dispatch(timerActions.flipIsRunning());
    dispatch(timerRingActions.pauseRing());
  };

  return (
    <div className={styles.timerContainer}>
      <h3
        className={`${styles.timerTypeLabel} ${
          darkMode ? styles["dark"] : styles["light"]
        }`}
      >
        {getTimerTypeLabel()}
      </h3>
      <h2
        className={`${styles.time} ${
          darkMode ? styles["dark"] : styles["light"]
        }`}
      >
        {minutes < 10 ? <span>0{minutes}</span> : <span>{minutes}</span>}:
        {seconds < 10 ? <span>0{seconds}</span> : <span>{seconds}</span>}
      </h2>
      <div className={styles.buttonsContainer}>
        <Button
          flex={true}
          onClick={flipAutoStartHandler}
          title={"Automatically start next timer"}
        >
          <img src={fastForwardBlack} alt="Black fast forward icon" />
        </Button>
        <Button onClick={timerChangeHandler} id={"bigButton"}>
          {bigLabel}
        </Button>
        <Button flex={true} onClick={skipHandler} title={"Skip this timer"}>
          <img src={skipBlack} alt="Black skip forward button" />
        </Button>
      </div>
    </div>
  );
};

export default Timer;
