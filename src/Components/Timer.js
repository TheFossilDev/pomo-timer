import { useState } from "react";
import { useTimer } from "react-timer-hook";
import Button from "./Styles/Button.styled";
import styled from "styled-components";

const TimerContainer = styled.div`
  flex: 2;
  
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  background-color: ${props => props.theme.cadetBlue};

`;

const Time = styled.h2`
  text-align: center;
`;

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
    <TimerContainer>
      <Button>Set</Button>
      <Time>
        <span>{minutes}</span>:
        {(seconds < 10) ? <span>0{seconds}</span> : <span>{seconds}</span>}
      </Time>
      {!started && <Button onClick={startHandler}>Start</Button>}
      {isRunning && <Button onClick={pause}>Stop</Button>}
      {!isRunning && started && <Button onClick={resume}>Resume</Button>}
      {/* {isRunning ? <p>Timer is running.</p> : <p>Timer is not running.</p>} */}
    </TimerContainer>
  );
};

export default Timer;
