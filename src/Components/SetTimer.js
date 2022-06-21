import React from 'react';
import Button from './Styles/Button.styled';
import Modal from '../UI/Modal';

const SetTimer = props => {
  return (
    <Modal>
      <header>
        <h2>Timer lengths</h2>
      </header>
      <div>
        <h3>Work period</h3>
      </div>
      <footer>
        <Button>Save</Button>
      </footer>
    </Modal>
  )
}

export default SetTimer;