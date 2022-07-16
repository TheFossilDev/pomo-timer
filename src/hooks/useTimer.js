import { useState } from "react";
import useInterval from "./useInterval";

const useTimer = (timerData, setTimerData, audio) => {
  const DEFAULT_DELAY = 1000;
  const [isRunning, setIsRunning] = useState(false);

  const HandleExpire = (skipped = false) => {
    let data = timerData;
    if (skipped) {
      data = { ...timerData, currentSeconds: 0 };
      localStorage.setItem("currentSeconds", 0);
    } else {
      audio.play();
    }
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
      data = { ...data, isActive: false };
    }
    // cases: work > rest, work > break, others > work
    if (timerData.timerType === "work") {
      data = { ...data, pomosCompleted: timerData.pomosCompleted + 1 };
      localStorage.setItem("pomosCompleted", timerData.pomosCompleted + 1);
      if (data.pomosCompleted % 4 === 0 && data.pomosCompleted > 0) {
        data = {
          ...data,
          timerType: "break",
          currentMinutes: timerData.breakMinutes,
          pomosCompleted: timerData.pomosCompleted + 1,
        };
        localStorage.setItem("timerType", "break");
        localStorage.setItem("currentMinutes", timerData.breakMinutes);
      } else {
        data = {
          ...data,
          timerType: "rest",
          currentMinutes: timerData.restMinutes,
          pomosCompleted: timerData.pomosCompleted + 1,
        };
        localStorage.setItem("timerType", "rest");
        localStorage.setItem("currentMinutes", timerData.restMinutes);
      }
    } else {
      data = {
        ...data,
        timerType: "work",
        currentMinutes: timerData.workMinutes,
      };
      localStorage.setItem("timerType", "work");
      localStorage.setItem("currentMinutes", timerData.workMinutes);
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
    // setTimerData({...timerData, currentSeconds: 0});
    HandleExpire(true);
    // setTimerData({...timerData, isActive: false});
  };

  useInterval(
    () => {
      if (
        timerData.currentSeconds - 1 < 0 &&
        timerData.currentMinutes - 1 < 0
      ) {
        HandleExpire();
      } else if (timerData.currentSeconds - 1 < 0) {
        setTimerData({
          ...timerData,
          currentSeconds: 59,
          currentMinutes: timerData.currentMinutes - 1,
        });
          localStorage.setItem("currentSeconds", 59);
          localStorage.setItem("currentMinutes", timerData.currentMinutes - 1);
      } else {
        setTimerData({
          ...timerData,
          currentSeconds: timerData.currentSeconds - 1,
        });
        localStorage.setItem("currentSeconds", timerData.currentSeconds - 1);
      }
    },
    isRunning ? DEFAULT_DELAY : null
  );

  return { isRunning, start, pause, resume, skip };
};

export default useTimer;
