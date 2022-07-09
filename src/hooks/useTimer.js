import { useState } from "react";
import useInterval from "./useInterval";

const useTimer = (minutesData, setMinutesData) => {
  const DEFAULT_DELAY = 1000;
  const [seconds, setSeconds] = useState(0);
  const [internalSeconds, setInternalSeconds] = useState(minutesData.workMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);

  const HandleExpire = () => {
    setIsRunning(false);
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
      setInternalSeconds(internalSeconds - 1);
      setSeconds(seconds - 1);
      if (internalSeconds % 60 === 0) {
        setMinutesData({workMinutes: minutesData.workMinutes - 1});
        setSeconds(59);
      }
      if (internalSeconds <= 1) {
        HandleExpire();
      }
    },
    isRunning ? DEFAULT_DELAY : null
  );

  return { seconds, minutesData, isRunning, start, pause, resume };
};

export default useTimer;
