import React, { MouseEventHandler } from 'react';

interface PlusButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const PlusButton: React.FC<PlusButtonProps> = ({ onClick }) => {
  return (
    <button  className='plus-button' onClick={onClick}>
        +
    </button>
  );
};

export default PlusButton;
