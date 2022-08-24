import React, { useState } from "react";

import { BsCircle, BsCheckCircle, BsAlarmFill } from "react-icons/bs";
import { Transition } from "react-transition-group";
import { FaPencilAlt, FaPlusSquare } from "react-icons/fa"
import TextInput from "../UI/TextInput";

const PomoTask = (props) => {
  const [clicked, setClicked] = useState(false);

  const clickHandler = () => {
    setClicked(true);
  };

  const onExit = () => {
    props.removeTask(props.id)
  };

  return (
    <Transition in={!clicked} timeout={250} onExited={onExit}>
      {(state) => (
        <div className={`flex min-h-${props.height} flex-col bg-gray-100 rounded-xl`}>
          <div className="flex items-center">
            {clicked ? <BsCheckCircle 
            className="h-8 w-8 m-2 cursor-pointer"
            /> :
            <BsCircle
              className="h-8 w-8 m-2 cursor-pointer"
              onClick={clickHandler}
            />}
            <p className="">{props.task.name}</p>
            <p className="ml-auto">{props.task.size}</p>
            <FaPencilAlt className="h-8 w-8 m-2 cursor-pointer" onClick={console.log('Editing')} />
            <FaPlusSquare className="h-8 w-8 m-2 cursor-pointer" onClick={console.log('Selecting')}/>
          </div>
          <div className="flex justify-evenly">
            <div className="flex flex-col">
              <h4>Desc:</h4>
              <TextInput className="" value={props.task.description}></TextInput>
            </div>
            <div className="flex justify-center items-start">
              <BsAlarmFill />
              <h4>Sub-tasks coming soon!</h4>
            </div>
          </div>
        </div>
      )}
    </Transition>
  );
};

export default PomoTask;
