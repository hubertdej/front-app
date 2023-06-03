import React, { MouseEventHandler } from 'react';

function PlusButton(props:{ onClick: MouseEventHandler }) {
  return (
        <button  className='plus-button' onClick={props.onClick}>
            +
        </button>
  );
}

export default PlusButton;
