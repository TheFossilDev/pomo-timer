import React from "react";
import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={`${styles["button"]} ${props.flex ? styles["flex"] : ""} ${styles[props.size]}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
