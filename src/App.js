import './App.css';
import React from "react"

function App() {
  const [time, setTime] = React.useState(0); // 0 is starting timer time
  const [timerOn, setTimerOn] = React.useState(false);

  return (
    <div className="App">
      <h1>Pomodoro Timer</h1>
    </div>
  );
}

export default App;
