import React, { MouseEventHandler } from 'react';

interface RemoveButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const RemoveButton: React.FC<RemoveButtonProps> = ({ onClick }) => {
  return (
    <button  className='remove-button' onClick={onClick}>
    </button>
  );
};

export default RemoveButton;
