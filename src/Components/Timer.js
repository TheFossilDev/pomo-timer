import { useState } from "react";
import { useTimer } from "react-timer-hook";
import Button from "./Styles/Button.styled";

const Timer = ({ expiryTimestamp }) => {
  const { seconds, minutes, isRunning, start, pause, resume } =
    useTimer({
      expiryTimestamp,
      onExpire: () => console.log("Expired!"),
      autoStart: false,
    }); // anon function used, but can be any func

  const [started, setStarted] = useState(false);

  const startHandler = () => {
    setStarted(true);
    start();
  };

  return (
    <div>
      <Button>Set</Button>
      <h2>
        <span>{minutes}</span>:
        {(seconds < 10) ? <span>0{seconds}</span> : <span>{seconds}</span>}
      </h2>
      {!started && <Button onClick={startHandler}>Start</Button>}
      {isRunning && <Button onClick={pause}>Stop</Button>}
      {!isRunning && started && <Button onClick={resume}>Resume</Button>}
      {/* {isRunning ? <p>Timer is running.</p> : <p>Timer is not running.</p>} */}
    </div>
  );
};

export default Timer;
