import React, { useState } from "react";
import styles from "./PomoTask.module.css";

import UncheckCircle from "../Icons/UncheckCircle";
import CheckCircle from "../Icons/CheckCircle";
import { Transition } from "react-transition-group";

const SubTask = (props) => {
  const [clicked, setClicked] = useState(false);

  const clickHandler = () => {
    setClicked(true);
  };

  const onExit = () => {
    props.removeSubTask(props.id)
  };
  return (
    <Transition in={!clicked} timeout={250} onExited={onExit}>
      {(state) => (
        <div
          className={`${styles["PomoTask"]} ${
            clicked ? styles[`PomoTask${state}`] : null
          }`}
        >
          <div className={styles.minimizedLine}>
            {clicked ? (
              <CheckCircle className={styles.finished} />
            ) : (
              <UncheckCircle
                className={styles.finished}
                onClick={clickHandler}
              />
            )}
            <p className={styles.name}>{props.subTask.name}</p>
          </div>
        </div>
      )}
    </Transition>
  );
};

export default SubTask;
