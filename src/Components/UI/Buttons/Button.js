import React, { useState } from "react";
import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <div className={styles.relativeContainer}>
      <button
        onClick={props.onClick}
        className={styles["button"]}
        title={props.title || ""}
        id={styles[props.id]}
        style={props.style}
      >
        {props.children}
      </button>
    </div>
  );
};

export default Button;
