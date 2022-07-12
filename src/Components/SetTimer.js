import React, { useState } from "react";
import Button from "./UI/Buttons/Button";

const SetTimer = (props) => {
  const [workMinutes, setWorkMinutes] = useState(props.timerData.workMinutes);
  const [restMinutes, setRestMinutes] = useState(props.timerData.restMinutes);
  const [breakMinutes, setBreakMinutes] = useState(
    props.timerData.breakMinutes
  );

  const submitHandler = (event) => {
    event.preventDefault();
    let data = {
      ...props.timerData,
      workMinutes: +workMinutes,
      restMinutes: +restMinutes,
      breakMinutes: +breakMinutes,
    };

    if (!props.timerData.isActive) {
      switch (props.timerData.timerType) {
        case "work":
          data = {...data, currentMinutes: +workMinutes};
          break;
        case "rest":
          data = {...data, currentMinutes: +restMinutes};
          break;
        case "break":
          data = {...data, currentMinutes: +breakMinutes};
          break;
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
        <h2>Timer durations:</h2>
      </header>
      <div>
        <label>Work minutes:</label>
        <input type="number" onChange={workChangeHandler} value={workMinutes} />
      </div>
      <div>
        <label>Short break minutes:</label>
        <input type="number" onChange={restChangeHandler} value={restMinutes} />
      </div>
      <div>
        <label>Long break minutes:</label>
        <input
          type="number"
          onChange={breakChangeHandler}
          value={breakMinutes}
        />
      </div>
      <footer>
        <Button type="submit">Save</Button>
      </footer>
    </form>
  );
};

export default SetTimer;
