import React from "react";
import { useSelector } from "react-redux";
import { Transition } from "react-transition-group";

import styles from "./Skip.module.css";

const Skip = (props) => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const helpMode = useSelector((state) => state.theme.helpMode);
  const autoStart = useSelector((state) => state.timer.autoStart);

  const duration = 500;
  return (
    <>
      <svg
        className={styles["skip"]}
        width="170"
        height="170"
        viewBox="0 0 170 170"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={props.onClick}
        style={{
          transition: `transform 750ms ease`,
        }}
      >
        <g id="Skip">
          <path
            id={styles["middle"]}
            d="M120 85.5L45.75 128.368V42.6317L120 85.5Z"
            fill={darkMode ? "#fff" : "#000"}
            fillOpacity={autoStart ? "0.8" : "0.2"}
          />
          <line
            id={styles["line"]}
            x1="124"
            y1="132"
            x2="124"
            y2="42"
            stroke={darkMode ? "#FFF" : "#000"}
            strokeOpacity={autoStart ? "0.8" : "0.2"}
            strokeWidth="8"
          />
        </g>
      </svg>
      <Transition in={helpMode} timeout={duration} mountOnEnter unmountOnExit>
        {(state) => (
          <div
            className={`${styles["tooltipBase"]} ${
              styles[`tooltipBase${state}`]
            }`}
          >
            <p className={styles["tooltipText"]}>Skip Timer?</p>
          </div>
        )}
      </Transition>
    </>
  );
};

export default Skip;
