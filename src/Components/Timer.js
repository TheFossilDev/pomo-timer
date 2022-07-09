import { useState } from "react";
import styles from "./Timer.module.css";
import Button from "./Button";
import useTimer from "../hooks/useCounter";

const Timer = (props) => {
  const { seconds, minutes, isRunning, start, pause, resume } = useTimer({
    duration: 1,
  });

  const [started, setStarted] = useState(false);

  const startHandler = () => {
    setStarted(true);
    start();
  };

  // const setHandler = () => {
  //   props.changeIsSetting(!props.isSetting);
  // }

  return (
    <div className={styles.timerContainer}>
      {/* <Button onClick={setHandler}>Set</Button> */}
      <h2 className={styles.time}>
        {minutes < 10 ? <span>0{minutes}</span> : <span>{minutes}</span>}:
        {seconds < 10 ? <span>0{seconds}</span> : <span>{seconds}</span>}
      </h2>
      {!started && <Button onClick={startHandler}>Start</Button>}
      {isRunning && <Button onClick={pause}>Stop</Button>}
      {!isRunning && started && <Button onClick={resume}>Resume</Button>}
    </div>
  );
};

export default Timer;
