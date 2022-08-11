import React from "react";
import Modal from "../UI/Modal";
import Button from "../UI/Buttons/Button";
import styles from "./ResetData.module.css";

const ResetData = (props) => {
  return (
    <Modal clickHandler={props.cancelConfirming} in={props.in}>
      <h3>Do you want to reset your saved timer durations and progress?</h3>
      <div className={styles["buttonsContainer"]}>
        <Button flex={true} onClick={props.cancelConfirming}>
          No
        </Button>
        <Button flex={true} onClick={props.onConfirming}>
          Yes
        </Button>
      </div>
    </Modal>
  );
};

export default ResetData;
