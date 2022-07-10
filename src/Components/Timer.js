import { useState } from "react";
import styles from "./Timer.module.css";
import Button from "./Button";
import useTimer from "../hooks/useTimer";

const Timer = (props) => {
  const { seconds, isRunning, start, pause, resume } = useTimer(
    props.timerData,
    props.setTimerData,
  );

  const setHandler = () => {
    props.changeIsSetting(!props.isSetting);
  };

  return (
    <div className={styles.timerContainer}>
      <Button onClick={setHandler}>Set</Button>
      <h3>{props.timerData.timerType}</h3>
      <h2 className={styles.time}>
        {props.timerData.currentMinutes < 10 ? <span>0{props.timerData.currentMinutes}</span> : <span>{props.timerData.currentMinutes}</span>}:
        {seconds < 10 ? <span>0{seconds}</span> : <span>{seconds}</span>}
      </h2>
      {!props.timerData.isActive && <Button onClick={start}>Start</Button>}
      {isRunning && <Button onClick={pause}>Stop</Button>}
      {!isRunning && props.timerData.isActive && <Button onClick={resume}>Resume</Button>}
    </div>
  );
};

export default Timer;
