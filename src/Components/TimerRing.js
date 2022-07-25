import React from "react";
import styles from "./TimerRing.module.css";
import { useSelector } from "react-redux";

const TimerRing = (props) => {
  const minutes = useSelector((state) => state.timer.minutes);
  return (
    <svg id={styles["BarSvg"]} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g>
        <circle
          className={styles["BaseCircle"]}
          id={styles["BaseCircle"]}
          cx="50%"
          cy="50%"
          r="16rem"
        />
        <circle
          className={`${styles["ProgressCircle"]} ${
            props.move ? styles["fill"] : ""
          }`}
          id={styles["ProgressCircle"]}
          style={{ transition: `stroke-dashoffset ${minutes * 60}s linear` }}
          cx="50%"
          cy="50%"
          r="16rem"
        />
      </g>
    </svg>
  );
};

export default TimerRing;
