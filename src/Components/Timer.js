import styles from "./Timer.module.css";
import Button from "./UI/Buttons/Button";
import BigButton from "./UI/Buttons/BigButton";
import useTimer from "../hooks/useTimer";
import { Update, UpdateDisabled, SkipNext, Delete } from "@mui/icons-material";
import { useState, useEffect } from "react";
import PomoSound from "../assets/PomoTimer.mp3";

const Timer = (props) => {
  const audio = new Audio(PomoSound);
  const { isRunning, start, pause, resume, skip } = useTimer(
    props.timerData,
    props.setTimerData,
    audio
  );

  const [bigLabel, setBigLabel] = useState();

  const setHandler = () => {
    props.changeIsSetting(!props.isSetting);
  };

  const flipAutoStartHandler = () => {
    localStorage.setItem("autoStart", !props.timerData.autoStart);
    props.setTimerData({
      ...props.timerData,
      autoStart: !props.timerData.autoStart,
    });
  };

  const getTimerTypeLabel = () => {
    switch (props.timerData.timerType) {
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
    if (props.timerData.isActive) {
      if (isRunning) {
        setBigLabel("Pause");
      } else {
        setBigLabel("Resume");
      }
    } else {
      setBigLabel("Start");
    }
  }, [props.timerData.isActive, isRunning]);

  const timerChangeHandler = () => {
    // WHEN THE BUTTON GETS CLICKED
    if (props.timerData.isActive) {
      // Is active
      if (isRunning) {
        // Is running
        pause();
        // setBigLabel("Resume");
      } else {
        // Isn't running
        resume();
        // setBigLabel("Pause");
      }
    } else {
      // Isn't running yet
      // setBigLabel("Pause");
      start();
    }
  };

  return (
    <div className={styles.timerContainer}>
      <div className={styles.topButtonsContainer}>
        <Button size={"medium"} flex={true} onClick={setHandler}>
          Set
        </Button>
        <Button size={"medium"} flex={true} onClick={props.flipIsConfirming}>
          <Delete />
        </Button>
      </div>
      <h3 className={styles.timerTypeLabel}>{getTimerTypeLabel()}</h3>
      <h2 className={styles.time}>
        {props.timerData.currentMinutes < 10 ? (
          <span>0{props.timerData.currentMinutes}</span>
        ) : (
          <span>{props.timerData.currentMinutes}</span>
        )}
        :
        {props.timerData.currentSeconds < 10 ? (
          <span>0{props.timerData.currentSeconds}</span>
        ) : (
          <span>{props.timerData.currentSeconds}</span>
        )}
      </h2>
      <div className={styles.buttonsContainer}>
        <Button flex={true} onClick={flipAutoStartHandler}>
          {props.timerData.autoStart ? <Update /> : <UpdateDisabled />}
        </Button>
        <BigButton onClick={timerChangeHandler}>{bigLabel}</BigButton>
        <Button flex={true} onClick={skip}>
          <SkipNext />
        </Button>
      </div>
    </div>
  );
};

export default Timer;
