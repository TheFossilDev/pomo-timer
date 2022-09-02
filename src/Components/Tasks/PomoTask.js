import React, { useState } from "react";

import { BsCircle, BsCheckCircle, BsAlarmFill } from "react-icons/bs";
import { Transition } from "react-transition-group";
import { FaPlusSquare, FaCaretDown } from "react-icons/fa"
import TextInput from "../UI/TextInput";

const PomoTask = (props) => {
  const [clicked, setClicked] = useState(false);
  const [editing, setEditing] = useState(false);

  const finishHandler = () => {
    setClicked(true);
  };

  const onExit = () => {
    props.removeTask(props.id)
  };

  const editingHandler = () => {
    setEditing(!editing);
  };

  const sendTaskUp = () => {
    props.setTaskActive(props.task);
  };

  return (
    <Transition in={!clicked} timeout={250} onExited={onExit}>
      {(state) => (
        <div className={`flex h-auto flex-col bg-gray-100 rounded-xl p-2`}>
          <div className="flex items-center">
            {clicked ? <BsCheckCircle 
            className="h-8 w-8 m-2 cursor-pointer"
            /> :
            <BsCircle
              className="h-8 w-8 m-2 cursor-pointer"
              onClick={finishHandler}
            />}
            {editing ? <TextInput className="flex flex-auto" value={props.task.name} onChange={props.onNameChange} /> : <p className="font-bold">{props.task.name}</p>}
            <p className="ml-auto">{props.task.size}</p>
            
            <FaPlusSquare className="h-8 w-8 m-2 cursor-pointer" onClick={sendTaskUp}/>
            <FaCaretDown className={`h-8 w-8 m-2 cursor-pointer ${editing ? "rotate-180" : ""}`} onClick={editingHandler} />
          </div>
          {editing ? <div className="flex justify-evenly">
            <div className="flex flex-col">
              <h4>Desc:</h4>
              <TextInput className="" value={props.task.description} onChange={props.onDescChange}></TextInput>
            </div>
            <div className="flexrc text-gray-500">
              <BsAlarmFill />
              <h4>Sub-tasks coming soon!</h4>
            </div>
          </div> : null}
        </div>
      )}
    </Transition>
  );
};

export default PomoTask;
