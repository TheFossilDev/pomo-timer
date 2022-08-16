import React from "react";

const AddBox = (props) => {
  return (
    <svg onClick={props.onClick} xmlns="http://www.w3.org/2000/svg" height="48" width="48">
      <path d="M22.5 34h3v-8.5H34v-3h-8.5V14h-3v8.5H14v3h8.5ZM9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h30q1.2 0 2.1.9.9.9.9 2.1v30q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h30V9H9v30ZM9 9v30V9Z" />
    </svg>
  );
};

export default AddBox;
