import BigButton from "./UI/Buttons/BigButton";
import useTimer from "../hooks/useTimer";
import { useDispatch, useSelector } from "react-redux";
import { timerActions } from "../store/timerReducer";
import { useState, useEffect } from "react";
import FastForward from "./UI/Buttons/FastForward";
import Skip from "./UI/Buttons/Skip";

import clickSound from '../assets/click.mp3';
import shallowClickSound from '../assets/shallowClick.mp3';
import PomoTask from "./Tasks/PomoTask";

const Timer = (props) => {
  const click = new Audio(clickSound);
  const shallowClick = new Audio(shallowClickSound);

  const dispatch = useDispatch();
  const timerType = useSelector((state) => state.timer.timerType);
  const seconds = useSelector((state) => state.timer.seconds);
  const minutes = useSelector((state) => state.timer.minutes);
  const timerState = useSelector((state) => state.timer.timerState);
  const timerLabel = useSelector((state) => state.timer.timerLabel);
    
  
  const darkMode = useSelector((state) => state.theme.darkMode);
  
  useTimer();

  const [bigLabel, setBigLabel] = useState();

  const flipAutoStartHandler = () => {
    dispatch(timerActions.flipAutoStart());
  };

  // Change timer label
  useEffect(() => {
    switch (timerState) {
      case "ready":
        setBigLabel("Start");
        break;
      case "running":
        setBigLabel("Pause");
        break;
      case "paused":
        setBigLabel("Resume");
        break;
      default:
        console.error("Improper timer state");
    }
  }, [timerState]);

  useEffect(() => {
    if (timerState === "running") {
      dispatch(timerActions.setTimerLabel())
    }
  }, [timerState, timerLabel, seconds, minutes, dispatch])

  const timerChangeHandler = () => {
    switch (timerState) {
      case "ready":
        click.play();
        dispatch(timerActions.start());
        break;
      case "running":
        click.play();
        dispatch(timerActions.pause());
        break;
      case "paused":
        shallowClick.play();
        dispatch(timerActions.resume());
        break;
      default:
        console.error("Improper timer state");
    }
  };

  const skipHandler = () => {
    props.setIsSkipConfirming(true);
    if (timerState === "running") dispatch(timerActions.pause());
  };

  return (
    <>
      {props.activeTask !== null ? <PomoTask id={props.activeTask.id} task={props.activeTask} /> : null}
      <div>
        <h2 className="font-bold text-9xl">
          {minutes < 10 ? <span>0{minutes}</span> : <span>{minutes}</span>}:
          {seconds < 10 ? <span>0{seconds}</span> : <span>{seconds}</span>}
        </h2>
        <div>
          <FastForward onClick={flipAutoStartHandler}></FastForward>
          <BigButton onClick={timerChangeHandler} id={"bigButton"}>
            {bigLabel}
          </BigButton>
          <Skip onClick={skipHandler}></Skip>
        </div>
      </div>
    </>
  );
};

export default Timer;
