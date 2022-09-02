import React from "react";
import { Transition } from "react-transition-group";

const Modal = (props) => {
  const duration = 600;
  return (
    <>
      <Transition in={props.in} timeout={duration} mountOnEnter unmountOnExit>
        {state => (
          <>
            <div
              onClick={props.clickHandler}
              ></div>
            <div>{props.children}</div>
          </>
        )}
      </Transition>
    </>
  );
};

export default Modal;
