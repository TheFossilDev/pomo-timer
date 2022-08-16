import React from 'react';
import styles from "./PrimaryTaskBin.module.css";

import AddBox from '../Icons/AddBox';

const PrimaryTaskBin = props => {
  return (
    <div className={styles.bin}>
      <AddBox />
      <p>Select task to set as active</p>
    </div>
  );
};

export default PrimaryTaskBin;