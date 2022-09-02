import React, { useState } from "react";
import Button from "./UI/Buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import { timerActions } from "../store/timerReducer";

const Settings = (props) => {
  const dispatch = useDispatch();
  const workMinutes = useSelector((state) => state.timer.workMinutes);
  const restMinutes = useSelector((state) => state.timer.restMinutes);
  const breakMinutes = useSelector((state) => state.timer.breakMinutes);

  const [workMinutesInput, setWorkMinutesInput] = useState(workMinutes);
  const [restMinutesInput, setRestMinutesInput] = useState(restMinutes);
  const [breakMinutesInput, setBreakMinutesInput] = useState(breakMinutes);

  const submitHandler = (event) => {
    event.preventDefault();

    localStorage.setItem("workMinutes", workMinutes);
    localStorage.setItem("restMinutes", restMinutes);
    localStorage.setItem("breakMinutes", breakMinutes);

    dispatch(
      timerActions.setTimerSettings({
        newWorkMinutes: +workMinutesInput,
        newRestMinutes: +restMinutesInput,
        newBreakMinutes: +breakMinutesInput,
      })
    );

    props.changeIsSetting(false);
  };

  const workChangeHandler = (event) => {
    setWorkMinutesInput(event.target.value);
  };

  const restChangeHandler = (event) => {
    setRestMinutesInput(event.target.value);
  };

  const breakChangeHandler = (event) => {
    setBreakMinutesInput(event.target.value);
  };

  return (
    <form onSubmit={submitHandler}>
      <header>
        <h2>Timer durations (minutes):</h2>
      </header>
      <div>
        <div>
          <label>Work: </label>
          <input
            type="number"
            min={1}
            max={99}
            onChange={workChangeHandler}
            value={workMinutesInput}
          />
        </div>
        <div>
          <label>Short break: </label>
          <input
            type="number"
            min={1}
            max={99}
            onChange={restChangeHandler}
            value={restMinutesInput}
          />
        </div>
        <div>
          <label>Long break: </label>
          <input
            type="number"
            min={1}
            max={99}
            onChange={breakChangeHandler}
            value={breakMinutesInput}
          />
        </div>
      </div>
      <footer>
        <Button
          type="submit"
          style={{
            marginLeft: "auto",
          }}
        >
          Save
        </Button>
      </footer>
    </form>
  );
};

export default Settings;
