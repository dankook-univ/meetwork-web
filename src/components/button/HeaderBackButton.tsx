import React from 'react';

interface HeaderBackButtonProps {
  color?: 'white' | 'black';
  onClick: () => void;
}

const HeaderBackButton: React.FC<HeaderBackButtonProps> = ({
  color = 'black',
  onClick,
}) => {
  return (
    <div
      className="flex w-[24px] h-[30px] items-center justify-center"
      onClick={onClick}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 18L9 12L15 6"
          stroke={color === 'black' ? '#363636' : '#FCFCFC'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default HeaderBackButton;
