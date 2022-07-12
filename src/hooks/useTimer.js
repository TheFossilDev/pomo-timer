import { useState } from "react";
import useInterval from "./useInterval";

const useTimer = (timerData, setTimerData) => {
  const DEFAULT_DELAY = 1000;
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const HandleExpire = () => {
    /* High level logic
    1. Sets running to false to stop timer (delay to null)
    2. Moves onto next section (decides)
    3. Stops being active (reset to start label)
    4. Sets minutes to setting
    5. 
     */
    if (!timerData.autoStart) {
      setIsRunning(false);
      setTimerData({
        ...timerData,
        isActive: false,
      })
    }
    // cases: work > rest, work > break, others > work
    if (timerData.timerType === "work") {
      // log completed pomo and decide rest or break
      if (timerData.pomosCompleted % 3 === 0 && timerData.pomosCompleted > 0) {
        // console.log(`PomosCompleted: ${timerData.pomosCompleted % 4}`);
        setTimerData({
          ...timerData,
          timerType: "break",
          currentMinutes: timerData.breakMinutes,
          pomosCompleted: timerData.pomosCompleted + 1,
          // isActive: false,
        });
      } else {
        setTimerData({
          ...timerData,
          timerType: "rest",
          currentMinutes: timerData.restMinutes,
          pomosCompleted: timerData.pomosCompleted + 1,
          // isActive: false,
        });
      }
    } else {
      setTimerData({
        ...timerData,
        timerType: "work",
        currentMinutes: timerData.workMinutes,
        // isActive: false,
      });
    }
  };

  const start = () => {
    // Random
    console.log(timerData.timerType === "work");

    switch (timerData.timerType) {
      case "work":
        setTimerData({ ...timerData, currentMinutes: timerData.workMinutes, isActive: true });
        setIsRunning(true);
        break;
      case "rest":
        setTimerData({ ...timerData, currentMinutes: timerData.restMinutes, isActive: true });
        setIsRunning(true);
        break;
      case "break":
        setTimerData({ ...timerData, currentMinutes: timerData.breakMinutes, isActive: true });
        setIsRunning(true);
        break;
      default:
        console.log("I broke :(");
        break;
    }
    // setTimerData({ ...timerData, isActive: true });
    // setIsRunning(true);
  };

  const pause = () => {
    setIsRunning(false);
  };

  const resume = () => {
    setIsRunning(true);
  };

  const skip = () => {
    setSeconds(0);
    HandleExpire();
    // setTimerData({...timerData, isActive: false});
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
        setTimerData({
          ...timerData,
          currentMinutes: timerData.currentMinutes - 1,
        });
        setSeconds(59);
      }
    },
    isRunning ? DEFAULT_DELAY : null
  );

  return { seconds, timerData, isRunning, start, pause, resume, skip };
};

export default useTimer;
