import React from "react";
import { useSelector } from "react-redux";

const Skip = (props) => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  const css = `
  .skip {
    cursor: pointer;
    transition: transform 250ms ease;
    width: 5rem;
    height: 5rem;
    position: absolute;
    right: 1rem;
    transform-origin: center;
  }
  
  #middle, #line {
    transition: all 500ms ease;
  }

  .skip:hover {
    transform: scale(1.1);
  }

  .tooltipBase {
    display: block;
    position: absolute;
    margin: 0 auto;
    padding: 0.25em 0.5em;
    top: 4rem;
    right: 2rem;
    background-color: rgba(0, 0, 0, 0.85);
  
    border-radius: 20%;
  
    transition: opacity 500ms linear 500ms;
    opacity: 0;
  }
  
  .skip:hover + .tooltipBase {
    opacity: 1;
  }
  
  .tooltipText {
    margin: 0;
    color: white;
  }
  `;
  return (
    <>
      <style>{css}</style>
      <svg
        className="skip"
        width="170"
        height="170"
        viewBox="0 0 170 170"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={props.onClick}
      >
        <g id="Skip">
          <path
            id="middle"
            d="M120 85.5L45.75 128.368V42.6317L120 85.5Z"
            fill={darkMode ? "#fff" : "#595959"}
            fillOpacity="0.8"
          />
          <line
            id="line"
            x1="124"
            y1="132"
            x2="124"
            y2="42"
            stroke={darkMode ? "#fff" : "#595959"}
            strokeOpacity="0.8"
            strokeWidth="8"
          />
        </g>
      </svg>
      <div className="tooltipBase">
        <p className="tooltipText">Skip Timer?</p>
      </div>
    </>
  );
};

export default Skip;
