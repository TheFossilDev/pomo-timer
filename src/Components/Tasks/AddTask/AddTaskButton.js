import React from 'react';

import { FaPlusCircle, FaCaretDown } from "react-icons/fa"

const AddTaskButton = props => {
  return (
    <div className="flexrc h-16 relative border-gray-300 border-solid border-t-2">
      <h3 className="absolute left-28 font-bold">Add task: </h3>
      <FaPlusCircle className="w-10 h-10 flex cursor-pointer" onClick={props.onClick}/>
      {props.addPanelOpen ? <FaCaretDown className={"absolute w-10 h-10 right-5 cursor-pointer"} onClick={() => props.setAddPanelOpen(false)}/> : null}
    </div>
  );
};

export default AddTaskButton;