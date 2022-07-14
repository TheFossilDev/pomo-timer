import React, { useState, useEffect } from "react";
import Button from "./UI/Buttons/Button";
import styles from "./SetTimer.module.css";

const SetTimer = (props) => {
  const [workMinutes, setWorkMinutes] = useState(props.timerData.workMinutes);
  const [restMinutes, setRestMinutes] = useState(props.timerData.restMinutes);
  const [breakMinutes, setBreakMinutes] = useState(
    props.timerData.breakMinutes
  );

  // useEffect(() => {
  //   localStorage.setItem("workMinutes", workMinutes);
  //   localStorage.setItem("restMinutes", restMinutes);
  //   localStorage.setItem("breakMinutes", breakMinutes);
  // }, [props.timerData.workMinutes, props.timerData.restMinutes, props.timerData.breakMinutes])
  

  const submitHandler = (event) => {
    event.preventDefault();
    let data = {
      ...props.timerData,
      workMinutes: +workMinutes,
      restMinutes: +restMinutes,
      breakMinutes: +breakMinutes,
    };
    localStorage.setItem("workMinutes", workMinutes);
    localStorage.setItem("restMinutes", restMinutes);
    localStorage.setItem("breakMinutes", breakMinutes);

    if (!props.timerData.isActive) {
      switch (props.timerData.timerType) {
        case "work":
          data = { ...data, currentMinutes: +workMinutes };
          break;
        case "rest":
          data = { ...data, currentMinutes: +restMinutes };
          break;
        case "break":
          data = { ...data, currentMinutes: +breakMinutes };
          break;
        default:
          console.error('Set timer broke');
      }
    }
    props.setTimerData(data);
    props.changeIsSetting(false);
  };
  // Nice to have #1
  // const submitAndChangeTimerHandler = event => {
  //   props.setTimerData({
  //     ...props.timerData,
  //     workMinutes: +workMinutes,
  //     currentMinutes: +workMinutes,
  //     restMinutes: +restMinutes,
  //     breakMinutes: +breakMinutes,
  //   });

  //   props.changeIsSetting(false);
  // }

  const workChangeHandler = (event) => {
    setWorkMinutes(event.target.value);
  };

  const restChangeHandler = (event) => {
    setRestMinutes(event.target.value);
  };

  const breakChangeHandler = (event) => {
    setBreakMinutes(event.target.value);
  };

  return (
    <form onSubmit={submitHandler}>
      <header>
        <h2 className={styles.header}>Timer durations (minutes):</h2>
      </header>
      <div className={styles.setTimerBody}>
        <div className={styles.inputContainer}>
          <label>Work: </label>
          <input
            type="number"
            onChange={workChangeHandler}
            value={workMinutes}
          />
        </div>
        <div className={styles.inputContainer}>
          <label>Short break: </label>
          <input
            type="number"
            onChange={restChangeHandler}
            value={restMinutes}
          />
        </div>
        <div className={styles.inputContainer}>
          <label>Long break: </label>
          <input
            type="number"
            onChange={breakChangeHandler}
            value={breakMinutes}
          />
        </div>
      </div>
      <footer>
        <Button type="submit">Save</Button>
      </footer>
    </form>
  );
};

export default SetTimer;
