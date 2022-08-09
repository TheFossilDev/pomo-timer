import React from "react";
import { useSelector } from "react-redux";

const FastForward = (props) => {
  const autoStart = useSelector((state) => state.timer.autoStart);
  const darkMode = useSelector((state) => state.theme.darkMode);

  let css = `
  .svg {
    cursor: pointer;
    transition: all 1s ease;
    width: 5rem;
    height: 5rem;
    position: absolute;
    left: 1rem;
  }

  #left {
    transition: all 1s ease;
    transform: translateX(-100%);
  }
  .svg:hover #left {
    transform: translateX(0%);
  }
  #middle {
    transition: all 1s ease;
  } 
  .svg:hover #middle {
    transform: translateX(20%);
  }

  #right {
    fill-color: #000;
    transition: all 1s ease;
  } 
  .svg:hover #right {
    transform: translateX(100%);
  }

  .fastForwardTipBase {
    display: block;
    position: absolute;
    margin: 0 auto;
    padding: 0.25em 0.5em;
    top: 4rem;
    left: -1rem;
    background-color: rgba(0, 0, 0, 0.85);
    z-index: 101;
  
    border-radius: 5%;
  
    transition: opacity 100ms linear 500ms;
    opacity: 0;
  }
  
  .svg:hover + .fastForwardTipBase {
    opacity: 1;
  }
  
  .fastForwardTipText {
    margin: 0;
    color: white;
  }

  `;

  return (
    <>
      <style>{css}</style>
      <svg
        className="svg"
        width="170"
        height="170"
        viewBox="0 0 170 170"
        fill="none"
        onClick={props.onClick}
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transition: `fillOpacity 750ms ease`,
          fillOpacity: autoStart ? "80%" : "20%",
        }}
      >
        <g id="FastForward">
          <path
            id="right"
            d="M148 85.5L73.75 128.368V42.6317L148 85.5Z"
            fill={darkMode ? "#DDD" : "#595959"}
          />
          <path
            id="middle"
            d="M120 85.5L45.75 128.368V42.6317L120 85.5Z"
            fill={darkMode ? "#FFF" : "#000"}
          />
          <path
            id="left"
            d="M120 85.5L45.75 128.368V42.6317L120 85.5Z"
            fill={darkMode ? "#DDD" : "#595959"}
          />
        </g>
      </svg>
      <div className="fastForwardTipBase">
        <p className="fastForwardTipText">Auto Start Timers?</p>
      </div>
    </>
  );
};

export default FastForward;
