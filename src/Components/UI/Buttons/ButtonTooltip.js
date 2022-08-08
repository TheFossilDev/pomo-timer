import React, { useState } from "react";
import styles from "./ButtonTooltip.module.css";

const ButtonTooltip = (props) => {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div className={styles.relativeContainer}>
      <button
        onClick={props.onClick}
        onMouseOver={() => setShowTooltip(true)}
        onMouseOut={() => setShowTooltip(false)}
        className={styles["button"]}
        id={styles[props.id]}
      >
        {props.children}
      </button>
      <div className={styles.tooltipBase}>
        <p className={styles.tooltipText}>{props.toolTip}</p>
      </div>
    </div>
  );
};

export default ButtonTooltip;
