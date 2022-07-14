import { useState } from "react";
import useInterval from "./useInterval";

const useTimer = (timerData, setTimerData, audio) => {
  const DEFAULT_DELAY = 1000;
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const HandleExpire = (skipped = false) => {
    if (!skipped) audio.play();
    let data = timerData;
    /* High level logic
    1. Sets running to false to stop timer (delay to null)
    2. Moves onto next section (decides)
    3. Stops being active (reset to start label)
    4. Sets minutes to setting
    5. 
     */
    if (!timerData.autoStart) {
      // Autostart disabled
      setIsRunning(false);
      // setTimerData({
      //   ...timerData,
      //   isActive: false,
      // })
      data = {...data, isActive: false};
    }
    // cases: work > rest, work > break, others > work
    if (timerData.timerType === "work") {
      data = {...data, pomosCompleted: timerData.pomosCompleted + 1};
      // log completed pomo and decide rest or break
      if (data.pomosCompleted % 4 === 0 && data.pomosCompleted > 0) {
        data = {...data, timerType: "break", currentMinutes: timerData.breakMinutes, pomosCompleted: timerData.pomosCompleted + 1};
      } else {
        data = {
          ...data,
          timerType: "rest",
          currentMinutes: timerData.restMinutes,
          pomosCompleted: timerData.pomosCompleted + 1,
        };
      }
    } else {
      data = {
        ...data,
        timerType: "work",
        currentMinutes: timerData.workMinutes,
      };
    }
    setTimerData(data);
  };

  const start = () => {
    setTimerData({ ...timerData, isActive: true });
    setIsRunning(true);
  };

  const pause = () => {
    setIsRunning(false);
  };

  const resume = () => {
    setIsRunning(true);
  };

  const skip = () => {
    setSeconds(0);
    HandleExpire(true);
    // setTimerData({...timerData, isActive: false});
  };

  useInterval(
    () => {
      // TODO: Fix weird off by one error
      setSeconds(seconds - 1);
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
