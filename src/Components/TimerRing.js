import { useEffect, useState } from "react";
import styles from "./TimerRing.module.css";
import { useSelector, useDispatch } from "react-redux";
import { timerActions } from "../store/timerReducer";
import styled from 'styled-components';
import { keyframes } from "styled-components";

const TimerRing = (props) => {
  const dispatch = useDispatch();
  const minutes = useSelector((state) => state.timer.minutes);
  const seconds = useSelector((state) => state.timer.seconds);
  const workMinutes = useSelector((state) => state.timer.workMinutes);
  const restMinutes = useSelector((state) => state.timer.restMinutes);
  const breakMinutes = useSelector((state) => state.timer.breakMinutes);
  const timerType = useSelector((state) => state.timer.timerType);
  const autoStart = useSelector((state) => state.timer.autoStart);

  const linePos = useSelector((state) => state.timer.linePos);
  const skipLinePos = useSelector((state) => state.timer.skipLinePos);
  const transition = useSelector((state) => state.timer.transition);
  const skipTransition = useSelector((state) => state.timer.skipTransition);
  const smoothOpacity = useSelector((state) => state.timer.smoothOpacity);
  const strokeFadeTransition = useSelector((state) => state.timer.strokeFadeTransition);

  const radius =
    parseFloat(getComputedStyle(document.documentElement).fontSize) * 16;
  const circleCirc = 2 * Math.PI * radius;
  const [secondsRemaining, setSecondsRemaining] = useState((minutes * 60) + seconds);
  const [maxSeconds, setMaxSeconds] = useState(workMinutes * 60);

  // Ring normal function
  // Goes from 0 to circumference as the ending point

  // What I need to resume from a pause:
  // Pause: Set the offset as the progress since the start (STATIC)
  // -- Need % of timer completed
  // Set the duration of the transition as the time remaining in the timer
  // -- Simple remaining seconds
  // Set the offset as max again

  /* ================= CALC SECONDS REMAINING ================= */
  // useEffect(() => {
  //   setSecondsRemaining((minutes * 60) + seconds)
  // }, [seconds, minutes])

  /* ================= TIMERTYPE CHANGES (NEW TIMER) ================= */
  // useEffect(() => {
  //   console.log('TIMER CHANGES');
  //   setLinePos(0);
  //   if (autoStart) {
  //     setTransitionBody(``);
  //     setTransitionBody(`stroke-dashoffset ${secondsRemaining}s linear`);
  //   }
  //   switch (timerType) {
  //     case 'work':
  //       setMaxSeconds(workMinutes * 60);
  //       break;
  //     case 'rest':
  //       setMaxSeconds(restMinutes * 60);
  //       break;
  //     case 'break':
  //       setMaxSeconds(breakMinutes * 60);
  //       break;
  //     default:
  //       console.error('TimerRing error');
  //       break;
  //   }
  
  // }, [timerType, workMinutes, restMinutes, breakMinutes])
  
  /* ================= TIMER PAUSES / STARTS ================= */
  // useEffect(() => {
  //   console.log('TIMER PAUSES / STARTS');
  //   if (isRunning) {
  //     // Timer has been started / resumed
  //     console.log('Started!');
  //     setTransitionBody(`stroke-dashoffset ${secondsRemaining}s linear`);
  //     setLinePos(``);
  //   } else {
  //     // Timer has been paused, skipped, ended
  //     console.log('Paused!');
  //     setLinePos(circleCirc * (secondsRemaining / maxSeconds))
  //     setTransitionBody(``);
  //   }
  // }, [isRunning, secondsRemaining, maxSeconds, circleCirc, timerType])
  
  const handleTransitonEnd = () => {
    dispatch(timerActions.handleTransitionEnd());
  }

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
            strokeDasharray: [circleCirc, circleCirc],
            strokeDashoffset: `${linePos}`,
            transition: `${transition}`,
            strokeOpacity: `${smoothOpacity}`,
          }}
          cx="50%"
          cy="50%"
          r="16rem"
        />
        <circle
          className={styles["SkipCircle"]}
          id={styles["SkipCircle"]}
          style={{
            strokeDasharray: [circleCirc, circleCirc],
            transition: `${skipTransition}`,
            strokeDashoffset: `${skipLinePos}`,
          }}
          cx="50%"
          cy="50%"
          r="16rem"
        />
        {/* <circle
          className={styles["SmoothCircle"]}
          id={styles["SmoothCircle"]}
          style={{
            strokeDasharray: [circleCirc, circleCirc],
            transition: `${strokeFadeTransition}`,
            strokeOpacity: `${smoothOpacity}`
          }}
          cx="50%"
          cy="50%"
          r="16rem"
        /> */}
      </g>
    </svg>
  );
};

export default TimerRing;
