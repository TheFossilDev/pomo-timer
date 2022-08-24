import React from 'react';

import { FaPlusSquare } from "react-icons/fa"

const PrimaryTaskBin = props => {
  return (
    <div className={`flexrc h-${props.height} bg-neutral-200 border-gray-500 border-dashed border-2 rounded-lg mx-2 mt-5`}>
      <FaPlusSquare className="w-10 h-10" />
      <p>Select task to set as active</p>
    </div>
  );
};

export default PrimaryTaskBin;