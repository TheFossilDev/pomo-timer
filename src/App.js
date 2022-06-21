import "./App.css";
import React from "react";
import Timer from "./Components/Timer";
import Button from "./Components/Button";

function App() {
  // TODO: Feature list
  // 1. Set timer duration
  // 2. Work mode, short break
  // 3. Auto advance / auto repeat
  // 4. Long break
  // 5. Basic UI styling

  const time = new Date();
  time.setSeconds(time.getSeconds() + 1500);

  return (
    <div className="App">
      <h1>Pomodoro Timer</h1>
      <Button />
      <Timer expiryTimestamp={time} />
    </div>
  );
}

export default App;
