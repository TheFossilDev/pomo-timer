import React, { useState } from "react";
import styles from "./PomoTask.module.css";

import UncheckCircle from "../Icons/UncheckCircle";
import CheckCircle from "../Icons/CheckCircle";
import { Transition } from "react-transition-group";
import { FaPencilAlt, FaPlusSquare } from "react-icons/fa"

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
        <div className={`${styles["PomoTask"]} ${clicked ? styles[`PomoTask${state}`] : null}`}>
          <div className={styles.minimizedLine}>
            {clicked ? <CheckCircle 
            className={styles.finished}
            /> :
            <UncheckCircle
              className={styles.finished}
              onClick={clickHandler}
            />}
            <p className={styles.name}>{props.task.name}</p>
            <p className={styles.duration}>{props.task.size}</p>
            <FaPencilAlt className="h-8 w-8 m-2 cursor-pointer" onClick={console.log('Editing')} />
            <FaPlusSquare className="h-8 w-8 m-2 cursor-pointer" onClick={console.log('Selecting')}/>
          </div>
          <div className={styles.expandMenu}>
            <div className={styles.halfBox}>
              <h4>Desc:</h4>
              <input className={styles.flexDesc} value={props.task.description}></input>
            </div>
          </div>
        </div>
      )}
    </Transition>
  );
};

export default PomoTask;
