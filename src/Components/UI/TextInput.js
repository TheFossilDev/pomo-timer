import React from 'react';

const TextInput = (props, type = "text") => {
  return (
    <input
    type={type}
    className={`w-full flex bg-gray-200 p-2 font-bold border-0 rounded-md ${props.className}`}
    value={props.value || "none!"}
    onChange={props.onChange || null}
  />
  );
};

export default TextInput;