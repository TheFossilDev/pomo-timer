import React, { useState } from 'react';

import Timer from "./Components/Timer";
import SetTimer from "./Components/SetTimer";
import styles from "./App.module.css";

const App = () => {
  // pomodor.io url?
  
  // TODO: Feature list
  // 1. Set timer duration
  // 2. Work mode, short break
  // 3. Auto advance / auto repeat
  // 4. Long break
  // 5. Basic UI styling

  const [isSetting, changeIsSetting] = useState(false);

  const time = new Date();
  time.setSeconds(time.getSeconds() + 1500);

  return (
    <div className={styles.flexContainer}>
      <h3>Pomodoro Timer</h3>
      {isSetting && <SetTimer />}
      <Timer expiryTimestamp={time} changeIsSetting={changeIsSetting} isSetting={isSetting}/>
    </div>
  );
}

export default App;
