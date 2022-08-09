import React from "react";
import { Transition } from "react-transition-group";
import { useSelector } from "react-redux";
import styles from "./FastForward.module.css";

const FastForward = (props) => {
  const autoStart = useSelector((state) => state.timer.autoStart);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const helpMode = useSelector((state) => state.theme.helpMode);

  const duration = 500;

  return (
    <>
      <svg
        className={styles["svg"]}
        onClick={props.onClick}
        width="170"
        height="170"
        viewBox="0 0 170 170"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transition: `fillOpacity 750ms ease`,
          fillOpacity: autoStart ? "80%" : "20%",
        }}
      >
        <g id={styles["FastForward"]}>
          <path
            id={styles["right"]}
            d="M148 85.5L73.75 128.368V42.6317L148 85.5Z"
            fill={darkMode ? "#DDD" : "#595959"}
          />
          <path
            id={styles["middle"]}
            d="M120 85.5L45.75 128.368V42.6317L120 85.5Z"
            fill={darkMode ? "#FFF" : "#000"}
          />
          <path
            id={styles["left"]}
            d="M120 85.5L45.75 128.368V42.6317L120 85.5Z"
            fill={darkMode ? "#DDD" : "#595959"}
          />
        </g>
      </svg>
      <Transition
        in={helpMode}
        timeout={duration}
        mountOnEnter
        unmountOnExit
      >
        {(state) => (
          <div
            className={`${styles["fastForwardTipBase"]} ${
              styles[`fastForwardTipBase${state}`]
            }`}
          >
            <p
              className={`${styles["fastForwardTipText"]} ${
                styles[`fastForwardTipText${state}`]
              }`}
            >
              Auto Start Timers?
            </p>
          </div>
        )}
      </Transition>
    </>
  );
};

export default FastForward;
