import React from "react";
import styles from "./BigButton.module.css";

const BigButton = (props) => {
  return (
    <button onClick={props.onClick} className={styles.bigButton}>
      {props.children}
    </button>
  );
};

export default BigButton;
