import React from "react";
import Card from "./Card";

export const Modal = (props) => {
  return <Card>{props.children}</Card>;
};

export default Modal;
