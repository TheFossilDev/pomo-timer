import { useState } from "react";
import useInterval from "./useInterval";

const useTimer = ({ duration: minuteDuration }) => {
  const DEFAULT_DELAY = 1000;
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(minuteDuration);
  const [internalSeconds, setInternalSeconds] = useState(minuteDuration * 60);
  const [isRunning, setIsRunning] = useState(false);

  const HandleExpire = () => {
    setIsRunning(false);
    console.log("Expired!");
  };

  const start = () => {
    console.log("Started!");
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
        setMinutes(minutes - 1);
        setSeconds(59);
      }
      if (internalSeconds <= 1) {
        HandleExpire();
      }
    },
    isRunning ? DEFAULT_DELAY : null
  );

  return { seconds, minutes, isRunning, start, pause, resume };
};

export default useTimer;
