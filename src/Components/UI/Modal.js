import React from "react";
import styles from "./Modal.module.css";
import { Transition } from "react-transition-group";

const Modal = (props) => {
  const duration = 600;
  return (
    <>
      <Transition in={props.in} timeout={duration} mountOnEnter unmountOnExit>
        {state => (
          <>
            <div
              className={`${styles.modalBackground} ${styles[`modalBackground${state}`]}`}
              onClick={props.clickHandler}
              ></div>
            <div className={`${styles.modalContainer} ${styles[`modalContainer${state}`]}`}>{props.children}</div>
          </>
        )}
      </Transition>
    </>
  );
};

export default Modal;
