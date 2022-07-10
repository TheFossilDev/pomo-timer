import { useState } from "react";
import useInterval from "./useInterval";

const useTimer = (timerData, setTimerData) => {
  const DEFAULT_DELAY = 1000;
  const DEBUG_VERY_FAST_DELAY = 100;
  const DEBUG_DELAY = 250;
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const HandleExpire = () => {
    setIsRunning(false);
    // cases: work > rest, work > break, others > work
    if (timerData.timerType === "work") {
      console.log('Worked');
      // log completed pomo and decide rest or break
      if (timerData.pomosCompleted % 3 === 0 && timerData.pomosCompleted > 0) {
        console.log(`PomosCompleted: ${timerData.pomosCompleted % 4}`);
        console.log('Breaking');
        setTimerData({...timerData, timerType: "break", currentMinutes: timerData.breakMinutes, pomosCompleted: timerData.pomosCompleted + 1, isActive: false});
      } else {
        console.log('Resting');
        setTimerData({...timerData, timerType: "rest", currentMinutes: timerData.restMinutes, pomosCompleted: timerData.pomosCompleted + 1, isActive: false});
      }
    } else {
      setTimerData({...timerData, timerType: "work", currentMinutes: timerData.workMinutes, isActive: false});
    }


  };

  const start = () => {
    // Random
    console.log(timerData.timerType === "work");
    
    switch (timerData.timerType) {
      case "work":
        setTimerData({...timerData, currentMinutes: timerData.workMinutes});
        break;
      case "rest":
        setTimerData({...timerData, currentMinutes: timerData.restMinutes});
        break;
      case "break":
        setTimerData({...timerData, currentMinutes: timerData.breakMinutes});
        break;
    }
    setTimerData({...timerData, isActive: true});
    setIsRunning(true);
  };

  const pause = () => {
    setIsRunning(false);
  };

  const resume = () => {
    setIsRunning(true);
  };

  useInterval(
    () => {
      // TODO: Fix weird off by one error
      // console.log(`Seconds before set: ${seconds}`);
      setSeconds(seconds - 1);
      // console.log(`Seconds after set: ${seconds}`);
      if (seconds <= 1 && timerData.currentMinutes <= 0) {
        HandleExpire();
      } else if (seconds <= 1) {
        setTimerData({...timerData, currentMinutes: timerData.currentMinutes - 1});
        setSeconds(59);
      }
    },
    isRunning ? DEBUG_VERY_FAST_DELAY : null
  );

  return { seconds, timerData, isRunning, start, pause, resume };
};

export default useTimer;
