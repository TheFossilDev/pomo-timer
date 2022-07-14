import React from 'react'
import styles from './Modal.module.css';

const Modal = props => {
  return (
    <>
      <div className={styles.modalBackground} onClick={props.clickHandler}>
        </div>
        <div className={styles.modalContainer}>
          {props.children}
        </div>
    </>
  )
}

export default Modal;