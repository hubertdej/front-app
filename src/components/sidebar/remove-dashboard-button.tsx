import React, { MouseEventHandler } from 'react';

function RemoveButton(props:{ onClick: MouseEventHandler }) {
  return (
      <button  className='remove-button' onClick={props.onClick} />
  );
}
export default RemoveButton;
