import React from 'react';
import Button from './Button';

const SetTimer = props => {

  const submitHandler = (event) => {
    event.preventDefault();
  }



  return (
    <form onSubmit={submitHandler}>
      <header>
        <h2>Timer lengths:</h2>
      </header>
      <div>
        <h3>Work period:</h3>
      </div>
      <div>
        <h3>Break period:</h3>
      </div>
      <footer>
        <Button type="submit">Save</Button>
      </footer>
    </form>
  )
}

export default SetTimer;