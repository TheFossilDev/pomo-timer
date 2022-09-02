import React from "react";

const primaryBtnStyle = ""; // Submit, save, add, etc.
const secondaryBtnStyle = ""; // Cancel buttons, no, reject, etc


const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      className=""
      title={props.title || ""}
      id={styles[props.id]}
      style={props.style}
    >
      {props.children}
    </button>
  );
};

export default Button;
