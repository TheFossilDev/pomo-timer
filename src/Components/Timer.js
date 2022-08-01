import styles from "./Timer.module.css";
import BigButton from "./UI/Buttons/BigButton";
import useTimer from "../hooks/useTimer";
import { useDispatch, useSelector } from "react-redux";
import { timerActions } from "../store/timerReducer";
import { useState, useEffect } from "react";
import FastForward from "./Icons/FastForward";
import Skip from "./Icons/Skip";

const Timer = (props) => {
  const dispatch = useDispatch();
  const timerType = useSelector((state) => state.timer.timerType);
  const seconds = useSelector((state) => state.timer.seconds);
  const minutes = useSelector((state) => state.timer.minutes);
  const timerState = useSelector((state) => state.timer.timerState);

  const darkMode = useSelector((state) => state.theme.darkMode);

  useTimer();

  const [bigLabel, setBigLabel] = useState();

  const flipAutoStartHandler = () => {
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
    switch (timerState) {
      case "ready":
        setBigLabel("Start");
        break;
      case "running":
        setBigLabel("Pause");
        break;
      case "paused":
        setBigLabel("Resume");
        break;
      default:
        console.error("Improper timer state");
    }
  }, [timerState]);

  const timerChangeHandler = () => {
    switch (timerState) {
      case "ready":
        dispatch(timerActions.start());
        break;
      case "running":
        dispatch(timerActions.pause());
        break;
      case "paused":
        dispatch(timerActions.resume());
        break;
      default:
        console.error("Improper timer state");
    }
  };

  const skipHandler = () => {
    props.flipIsSkipConfirming();
    if (timerState === "running") dispatch(timerActions.pause());
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
        <FastForward onClick={flipAutoStartHandler}></FastForward>
        <BigButton onClick={timerChangeHandler} id={"bigButton"}>
          {bigLabel}
        </BigButton>
        <Skip onClick={skipHandler}></Skip>
      </div>
    </div>
  );
};

export default Timer;
