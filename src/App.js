import React from "react";
import Timer from "./Components/Timer";
import GlobalStyles from "./Components/Styles/Global";
import styled from "styled-components";

const appContainer = styled.div`
  display: flex;
  background-color: ${props => props.theme.offWhite};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const appTitle = styled.h3`
  text-align: center;
  font-family: 'Roboto', sans-serif;
`;


const App = () => {
  // pomodor.io url?
  
  // TODO: Feature list
  // 1. Set timer duration
  // 2. Work mode, short break
  // 3. Auto advance / auto repeat
  // 4. Long break
  // 5. Basic UI styling




  const time = new Date();
  time.setSeconds(time.getSeconds() + 1500);

  return (
    <>
      <GlobalStyles />
      <appContainer>
        <appTitle>Pomodoro Timer</appTitle>
        <Timer expiryTimestamp={time} />
      </appContainer>
    </>
  );
}

export default App;
