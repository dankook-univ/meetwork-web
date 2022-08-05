import React from 'react';

interface CustomButtonProps {
  style?: React.HTMLAttributes<JSX.IntrinsicElements['div']>['className'];
  label: string;
  onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  style,
  label,
  onClick,
}) => {
  return (
    <div
      className={`flex p-[10px] border border-white rounded-[50px] items-center justify-center ${style}`}
      onClick={onClick}
    >
      <span className="font-bold text-[16px] text-white">{label}</span>
    </div>
  );
};

export default CustomButton;
