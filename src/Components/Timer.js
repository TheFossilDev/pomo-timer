import styles from "./Timer.module.css";
import Button from "./UI/Buttons/Button";
import BigButton from "./UI/Buttons/BigButton";
import useTimer from "../hooks/useTimer";
import { Update, UpdateDisabled, SkipNext } from "@mui/icons-material";
import { useState } from "react";

const Timer = (props) => {
  const { seconds, isRunning, start, pause, resume, skip } = useTimer(
    props.timerData,
    props.setTimerData
  );

  const [bigLabel, setBigLabel] = useState("Start");
  const [timerTypeLabel, setTimerTypeLabel] = useState(
    "Time for a work period!"
  );

  const setHandler = () => {
    props.changeIsSetting(!props.isSetting);
  };

  const flipAutoStartHandler = () => {
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

  const timerChangeHandler = () => {
    if (props.timerData.isActive) {
      // Is active
      if (isRunning) {
        // Is running
        setBigLabel("Pause");
        pause();
      } else {
        // Isn't running
        setBigLabel("Resume");
        resume();
      }
    } else {
      // Isn't running yet
      setBigLabel("Start");
      start();
    }
  };

  return (
    <div className={styles.timerContainer}>
      <Button onClick={setHandler}>Set</Button>
      <h3 className={styles.timerTypeLabel}>{getTimerTypeLabel()}</h3>
      <h2 className={styles.time}>
        {props.timerData.currentMinutes < 10 ? (
          <span>0{props.timerData.currentMinutes}</span>
        ) : (
          <span>{props.timerData.currentMinutes}</span>
        )}
        :{seconds < 10 ? <span>0{seconds}</span> : <span>{seconds}</span>}
      </h2>
      <div className={styles.buttonsContainer}>
        <Button flex={true} onClick={flipAutoStartHandler}>
          {props.timerData.autoStart ? <Update /> : <UpdateDisabled />}
        </Button>
        {/* {!props.timerData.isActive && (
          <BigButton onClick={start}>Start</BigButton>
        )} */}
        {/* {isRunning && <BigButton onClick={pause}>Stop</BigButton>}
        {!isRunning && props.timerData.isActive && (
          <BigButton onClick={resume}>Resume</BigButton>
        )} */}
        <BigButton onClick={timerChangeHandler}>{bigLabel}</BigButton>
        <Button flex={true} onClick={skip}>
          <SkipNext />
        </Button>
      </div>
    </div>
  );
};

export default Timer;
