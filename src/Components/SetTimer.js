import React, { useState } from 'react';
import Button from './Button';

const SetTimer = props => {
  const [workMinutes, setWorkMinutes] = useState(props.minutesData.workMinutes);
  const [shortBreakMinutes, setShortBreakMinutes] = useState(props.minutesData.shortBreakMinutes);
  const [longBreakMinutes, setLongBreakMinutes] = useState(props.minutesData.longBreakMinutes);

  const submitHandler = (event) => {
    event.preventDefault();

    props.setMinutesData({
      ...props.minutesData,
      workMinutes: +workMinutes,
      shortBreakMinutes: +shortBreakMinutes,
      longBreakMinutes: +longBreakMinutes,
    });
    
    
    props.changeIsSetting(false);
  }
  // TODO: Add new button for adjusting current timer
  const submitAndChangeTimerHandler = event => {
    // event.preventDefault();
    props.setMinutesData({
      ...props.minutesData,
      workMinutes: +workMinutes,
      currentMinutes: +workMinutes,
      shortBreakMinutes: +shortBreakMinutes,
      longBreakMinutes: +longBreakMinutes,
    });

    props.changeIsSetting(false);
  }

  const workChangeHandler = event => {
    setWorkMinutes(event.target.value);
  }

  const shortBreakChangeHandler = event => {
    setShortBreakMinutes(event.target.value);
  }

  const longBreakChangeHandler = event => {
    setLongBreakMinutes(event.target.value);
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
        <input type="number" onChange={shortBreakChangeHandler} value={shortBreakMinutes}/>
      </div>
      <div>
        <label>Long break minutes:</label>
        <input type="number" onChange={longBreakChangeHandler} value={longBreakMinutes}/>
      </div>
      <footer>
        <Button type="submit">Save</Button>
        <Button onClick={submitAndChangeTimerHandler}>Save and adjust current timer</Button>
      </footer>
    </form>
  )
}

export default SetTimer;