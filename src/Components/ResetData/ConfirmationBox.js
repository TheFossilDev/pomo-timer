import React from 'react'
import Modal from '../UI/Modal';
import Button from '../UI/Buttons/Button';
import styles from './ConfirmationBox.module.css';

const ConfirmationBox = (props) => {
  const clearData = () => {
    // TODO - ISSUE: clearing does not pause correctly. Maybe a move to context for timer data?
    props.flipIsConfirming();
    localStorage.clear();

    props.setTimerData({
      timerType: "work",
      isActive: false,
      autoStart: false,
      pomosCompleted: 0,
      workMinutes: 25,
      restMinutes: 5,
      breakMinutes: 30,
      currentMinutes: 25,
      currentSeconds: 0
    });
  }

  return (
    <Modal clickHandler={props.flipIsConfirming}>
      <h3>Do you want to reset your saved timer durations and progress?</h3>
      <div className={styles["buttonsContainer"]}>
        <Button flex={true} onClick={props.flipIsConfirming}>No</Button>
        <Button flex={true} onClick={clearData}>Yes</Button>
      </div>
    </Modal>
  )
}

export default ConfirmationBox;