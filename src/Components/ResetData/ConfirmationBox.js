import React from "react";
import Modal from "../UI/Modal";
import Button from "../UI/Buttons/Button";
import styles from "./ConfirmationBox.module.css";
import { useDispatch } from "react-redux";
import { timerActions } from "../../store/timerReducer";

const ConfirmationBox = (props) => {
  const dispatch = useDispatch();
  const clearData = () => {
    props.flipIsConfirming();
    localStorage.clear();

    // Reset to defaults
    dispatch(timerActions.returnTimerToDefault());
  };

  return (
    <Modal clickHandler={props.flipIsConfirming}>
      <h3>Do you want to reset your saved timer durations and progress?</h3>
      <div className={styles["buttonsContainer"]}>
        <Button flex={true} onClick={props.flipIsConfirming}>
          No
        </Button>
        <Button flex={true} onClick={clearData}>
          Yes
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmationBox;
