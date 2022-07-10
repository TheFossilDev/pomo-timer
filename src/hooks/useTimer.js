import { useState } from "react";
import useInterval from "./useInterval";

const useTimer = (timerData, setTimerData) => {
  const DEFAULT_DELAY = 1000;
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const HandleExpire = () => {
    setIsRunning(false);
    // cases: work > rest, work > break, others > work
    if (timerData.timerType === "work") {
      // log completed pomo and decide rest or break
      // timerData.pomosCompleted += 1;
      // setTimerData({pomosCompleted: pomosCompleted + 1});
      if (timerData.pomosCompleted % 4 === 0) {
        setTimerData({...timerData, timerType: "break"});
      } else {
        setTimerData({...timerData, timerType: "rest"});
      }
    }


  };

  const start = () => {
    setSeconds(seconds);
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
      setSeconds(seconds - 1);
      if (seconds <= 1 && timerData.currentMinutes <= 0) {
        HandleExpire();
      } else if (seconds <= 1) {
        setTimerData({...timerData, currentMinutes: timerData.currentMinutes - 1});
        setSeconds(59);
      }
    },
    isRunning ? DEFAULT_DELAY : null
  );

  return { seconds, timerData, isRunning, start, pause, resume };
};

export default useTimer;
