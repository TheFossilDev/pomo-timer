import React, { useState } from "react";
import styles from "./PomoTask.module.css";

import UncheckCircle from "../Icons/UncheckCircle";
import CheckCircle from "../Icons/CheckCircle";
import { Transition } from "react-transition-group";
import EditButton from "../Icons/EditButton";
import SelectSquareBox from "../Icons/SelectSquareBox";

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
            <EditButton className={styles.taskIcon} />
            <SelectSquareBox className={styles.taskIcon}/>
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
