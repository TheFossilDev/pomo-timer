import React from 'react';
import Button from './Button';

const SetTimer = props => {

  const submitHandler = (event) => {
    event.preventDefault();
  }

  const workChangeHandler = event => {
    console.log(`Work: ${event.target.value}`);
    console.log(event);
  }

  const shortBreakChangeHandler = event => {
    console.log(`Short break: ${event}`);
  }

  const longBreakChangeHandler = event => {
    console.log(`Long break: ${event}`);
  }



  return (
    <form onSubmit={submitHandler}>
      <header>
        <h2>Timer durations:</h2>
      </header>
      <div>
        <label>Work minutes:</label>
        <input type="number" onChange={workChangeHandler} value={}/>
      </div>
      <div>
        <label>Short break minutes:</label>
        <input type="number" onChange={shortBreakChangeHandler} value={}/>
      </div>
      <div>
        <label>Long break minutes:</label>
        <input type="number" onChange={longBreakChangeHandler} value={}/>
      </div>
      <footer>
        <Button type="submit">Save</Button>
      </footer>
    </form>
  )
}

export default SetTimer;