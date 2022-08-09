import React from "react";
import { Transition } from "react-transition-group";
import styles from "./ButtonTooltip.module.css";

const ButtonTooltip = (props) => {

  return (
    <div className={styles.relativeContainer}>
      <button
        onClick={props.onClick}
        className={styles["button"]}
        id={styles[props.id]}
      >
        {props.children}
      </button>
      <Transition in={props.in} timeout={500} mountOnEnter unmountOnExit>
        {state => (
          <div className={`${styles["tooltipBase"]} ${
            styles[`tooltipBase${state}`]
          }`}>
            <p className={styles.tooltipText}>Clear progress</p>
          </div>
        )}
      </Transition>
    </div>
  );
};

export default ButtonTooltip;
