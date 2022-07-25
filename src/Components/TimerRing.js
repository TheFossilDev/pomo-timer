import { useEffect, useState } from "react";
import styles from "./TimerRing.module.css";
import { useSelector } from "react-redux";

const TimerRing = (props) => {
  const minutes = useSelector((state) => state.timer.minutes);
  const seconds = useSelector((state) => state.timer.seconds);
  const isRunning = useSelector((state) => state.timer.isRunning);
  const workMinutes = useSelector((state) => state.timer.workMinutes);
  const restMinutes = useSelector((state) => state.timer.restMinutes);
  const breakMinutes = useSelector((state) => state.timer.breakMinutes);
  const timerType = useSelector((state) => state.timer.timerType);

  const radius =
    parseFloat(getComputedStyle(document.documentElement).fontSize) * 16;
  const circleCirc = 2 * Math.PI * radius;
  const [secondsRemaining, setSecondsRemaining] = useState((minutes * 60) + seconds);
  const [maxSeconds, setMaxSeconds] = useState(workMinutes * 60);
  const [transitionBody, setTransitionBody] = useState(`stroke-dashoffset ${secondsRemaining}s linear`);
  const [linePos, setLinePos] = useState(circleCirc);

  // Ring normal function
  // Goes from 0 to circumference as the ending point

  // What I need to resume from a pause:
  // Pause: Set the offset as the progress since the start (STATIC)
  // -- Need % of timer completed
  // Set the duration of the transition as the time remaining in the timer
  // -- Simple remaining seconds
  // Set the offset as max again

  useEffect(() => {
    setSecondsRemaining((minutes * 60) + seconds)
  }, [seconds, minutes])

  useEffect(() => {
    switch (timerType) {
      case 'work':
        setMaxSeconds(workMinutes * 60);
        break;
      case 'rest':
        setMaxSeconds(restMinutes * 60);
        break;
      case 'break':
        setMaxSeconds(breakMinutes * 60);
        break;
      default:
        console.error('TimerRing error');
        break;
    }
  
  }, [timerType, workMinutes, restMinutes, breakMinutes])
  

  useEffect(() => {
    if (isRunning) {
      // Timer has been started / resumed
      console.log('Started!');
      setTransitionBody(`stroke-dashoffset ${secondsRemaining}s linear`);
      setLinePos(``);
    } else {
      // Timer has been paused, skipped, ended
      console.log('Paused!');
      setLinePos(circleCirc * (secondsRemaining / maxSeconds))
      setTransitionBody(``);
    }
  }, [isRunning, secondsRemaining, maxSeconds, circleCirc, timerType])
  

  return (
    <svg id={styles["BarSvg"]} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g>
        <circle
          className={styles["BaseCircle"]}
          id={styles["BaseCircle"]}
          cx="50%"
          cy="50%"
          r="16rem"
        />
        <circle
          className={styles["ProgressCircle"]}
          id={styles["ProgressCircle"]}
          style={{
            transition: `${transitionBody}`,
            strokeDasharray: [circleCirc, circleCirc],
            strokeDashoffset: `${linePos}`,
          }}
          cx="50%"
          cy="50%"
          r="16rem"
        />
      </g>
    </svg>
  );
};

export default TimerRing;
