import React from 'react';

interface CheckButtonProps {
  onClick: () => void;
}

const CheckButton: React.FC<CheckButtonProps> = ({ onClick }) => {
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
          d="M20 6L9 17L4 12"
          stroke="#363636"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default CheckButton;
