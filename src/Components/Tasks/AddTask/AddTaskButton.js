import React from 'react';
import AddCircle from '../../Icons/AddCircle';
import styles from "./AddTaskButton.module.css";

import CloseCircle from "../../Icons/CloseCircle";


const AddTaskButton = props => {
  return (
    <div className={styles.container}>
      <h3 className={styles.label}>Add task: </h3>
      <AddCircle className={styles.add} onClick={props.onClick} />
      {props.addPanelOpen ? <CloseCircle className={styles.close} onClick={() => props.setAddPanelOpen(false)}/> : null}
    </div>
  );
};

export default AddTaskButton;