import styles from "./Timer.module.css";
import Button from "./UI/Buttons/Button";
import BigButton from "./UI/Buttons/BigButton";
import useTimer from "../hooks/useTimer";
import { Update, UpdateDisabled, SkipNext, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { timerActions } from "../store/timerReducer";
import { useState, useEffect } from "react";
import PomoSound from "../assets/PomoTimer.mp3";

const Timer = (props) => {
  const audio = new Audio(PomoSound);
  const dispatch = useDispatch();
  const timerType = useSelector((state) => state.timer.timerType);
  const seconds = useSelector((state) => state.timer.seconds);
  const minutes = useSelector((state) => state.timer.minutes);
  const isRunning = useSelector((state) => state.timer.isRunning);
  const isActive = useSelector((state) => state.timer.isActive);
  const autoStart = useSelector((state) => state.timer.autoStart);

  useTimer(props.timerData, props.setTimerData, audio);

  const [bigLabel, setBigLabel] = useState();

  const setHandler = () => {
    props.changeIsSetting(!props.isSetting);
  };

  const flipAutoStartHandler = () => {
    // localStorage.setItem("autoStart", !props.timerData.autoStart);
    dispatch(timerActions.flipAutoStart());
  };

  const getTimerTypeLabel = () => {
    switch (timerType) {
      case "work":
        return "Time for a work period!";
      case "rest":
        return "Time for a quick break!";
      case "break":
        return "Congrats! You earned a long break";
      default:
        return "whoops, defaulted";
    }
  };
  // Change timer label
  useEffect(() => {
    if (isActive) {
      if (isRunning) {
        setBigLabel("Pause");
      } else {
        setBigLabel("Resume");
      }
    } else {
      setBigLabel("Start");
    }
  }, [isActive, isRunning]);

  const timerChangeHandler = () => {
    // WHEN THE BUTTON GETS CLICKED
    if (isActive) {
      // Is active
      if (isRunning) {
        // Is running
        dispatch(timerActions.flipIsRunning());
        // setBigLabel("Resume");
      } else {
        // Isn't running
        dispatch(timerActions.flipIsRunning());
        // setBigLabel("Pause");
      }
    } else {
      // Isn't running yet
      // setBigLabel("Pause");
      dispatch(timerActions.start());
    }
  };

  const skipHandler = () => {
    dispatch(timerActions.skip());
  };

  return (
    <div className={styles.timerContainer}>
      <div className={styles.topButtonsContainer}>
        <Button
          size={"medium"}
          flex={true}
          onClick={setHandler}
          title={"Change timer lengths"}
        >
          Set
        </Button>
        <Button
          size={"medium"}
          flex={true}
          onClick={props.flipIsConfirming}
          title={"Reset your saved progress"}
        >
          <Delete />
        </Button>
      </div>
      <h3 className={styles.timerTypeLabel}>{getTimerTypeLabel()}</h3>
      <h2 className={styles.time}>
        {minutes < 10 ? <span>0{minutes}</span> : <span>{minutes}</span>}:
        {seconds < 10 ? <span>0{seconds}</span> : <span>{seconds}</span>}
      </h2>
      <div className={styles.buttonsContainer}>
        <Button
          flex={true}
          onClick={flipAutoStartHandler}
          title={"Automatically start next timer"}
        >
          {autoStart ? <Update /> : <UpdateDisabled />}
        </Button>
        <BigButton onClick={timerChangeHandler}>{bigLabel}</BigButton>
        <Button flex={true} onClick={skipHandler} title={"Skip this timer"}>
          <SkipNext />
        </Button>
      </div>
    </div>
  );
};

export default Timer;
