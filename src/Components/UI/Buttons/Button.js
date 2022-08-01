import React from "react";
import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={styles["button"]}
      title={props.title || ""}
      id={styles[props.id]}
    >
      {props.children}
    </button>
  );
};

export default Button;
