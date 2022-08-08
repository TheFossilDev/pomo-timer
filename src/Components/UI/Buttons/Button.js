import React, { useState } from "react";
import styles from "./Button.module.css";

const Button = (props) => {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div className={styles.relativeContainer}>
      <button
        onClick={props.onClick}
        onMouseOver={() => setShowTooltip(true)}
        onMouseOut={() => setShowTooltip(false)}
        className={styles["button"]}
        title={props.title || ""}
        id={styles[props.id]}
      >
        {props.children}
      </button>
    </div>
  );
};

export default Button;
