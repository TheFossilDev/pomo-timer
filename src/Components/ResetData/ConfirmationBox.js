import React from "react";
import Modal from "../UI/Modal";
import Button from "../UI/Buttons/Button";
import styles from "./ConfirmationBox.module.css";

const ConfirmationBox = (props) => {
  return (
    <Modal clickHandler={props.flipIsConfirming} in={props.in}>
      <h3>Do you want to reset your saved timer durations and progress?</h3>
      <div className={styles["buttonsContainer"]}>
        <Button flex={true} onClick={props.flipIsConfirming}>
          No
        </Button>
        <Button flex={true} onClick={props.onConfirming}>
          Yes
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmationBox;
