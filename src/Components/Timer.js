import { useEffect, useState } from "react";
import styles from "./Timer.module.css";
import Button from "./Button";
import useTimer from "../hooks/useTimer";

const Timer = (props) => {
  const { seconds, isRunning, start, pause, resume } = useTimer(
    props.minutesData,
    props.setMinutesData
  );

  const [started, setStarted] = useState(false);

  const startHandler = () => {
    setStarted(true);
    start();
  };

  const setHandler = () => {
    props.changeIsSetting(!props.isSetting);
  };

  return (
    <div className={styles.timerContainer}>
      <Button onClick={setHandler}>Set</Button>
      <h2 className={styles.time}>
        {props.minutesData.workMinutes < 10 ? <span>0{props.minutesData.workMinutes}</span> : <span>{props.minutesData.workMinutes}</span>}:
        {seconds < 10 ? <span>0{seconds}</span> : <span>{seconds}</span>}
      </h2>
      {!started && <Button onClick={startHandler}>Start</Button>}
      {isRunning && <Button onClick={pause}>Stop</Button>}
      {!isRunning && started && <Button onClick={resume}>Resume</Button>}
    </div>
  );
};

export default Timer;
