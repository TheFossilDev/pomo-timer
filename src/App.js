import './App.css';
import React from "react"
import Timer from './Components/Timer';

function App() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 1500);

  return (
    <div className="App">
      <h1>Pomodoro Timer</h1>
      <Timer expiryTimestamp={time}/>
    </div>
  );
}

export default App;
