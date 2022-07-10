import React, { useState } from 'react';
import Button from './Button';

const SetTimer = props => {
  const [workMinutes, setWorkMinutes] = useState(props.minutesData.workMinutes);
  const [restMinutes, setRestMinutes] = useState(props.minutesData.restMinutes);
  const [breakMinutes, setBreakMinutes] = useState(props.minutesData.breakMinutes);

  const submitHandler = (event) => {
    event.preventDefault();

    props.setMinutesData({
      ...props.minutesData,
      workMinutes: +workMinutes,
      shortBreakMinutes: +restMinutes,
      longBreakMinutes: +breakMinutes,
    });
    props.changeIsSetting(false);
  }
  // Nice to have #1
  // const submitAndChangeTimerHandler = event => {
  //   props.setMinutesData({
  //     ...props.minutesData,
  //     workMinutes: +workMinutes,
  //     currentMinutes: +workMinutes,
  //     restMinutes: +restMinutes,
  //     breakMinutes: +breakMinutes,
  //   });

  //   props.changeIsSetting(false);
  // }

  const workChangeHandler = event => {
    setWorkMinutes(event.target.value);
  }

  const shortBreakChangeHandler = event => {
    setRestMinutes(event.target.value);
  }

  const longBreakChangeHandler = event => {
    setBreakMinutes(event.target.value);
  }



  return (
    <form onSubmit={submitHandler}>
      <header>
        <h2>Timer durations:</h2>
      </header>
      <div>
        <label>Work minutes:</label>
        <input type="number" onChange={workChangeHandler} value={workMinutes}/>
      </div>
      <div>
        <label>Short break minutes:</label>
        <input type="number" onChange={shortBreakChangeHandler} value={restMinutes}/>
      </div>
      <div>
        <label>Long break minutes:</label>
        <input type="number" onChange={longBreakChangeHandler} value={breakMinutes}/>
      </div>
      <footer>
        <Button type="submit">Save</Button>
        {/* <Button onClick={submitAndChangeTimerHandler}>Save and adjust current timer</Button> */}
      </footer>
    </form>
  )
}

export default SetTimer;