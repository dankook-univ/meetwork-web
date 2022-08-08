import React, { useCallback } from 'react';

interface CustomButtonProps {
  style?: React.HTMLAttributes<JSX.IntrinsicElements['div']>['className'];
  label: string;
  onClick?: () => void;
  disable?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  style,
  label,
  onClick,
  disable = false,
}) => {
  const handleOnClick = useCallback(() => {
    if (!disable && onClick) {
      onClick();
    }
  }, [onClick, disable]);

  return (
    <div
      className={`flex p-[10px] border border-white rounded-[50px] items-center justify-center ${style}`}
      onClick={handleOnClick}
    >
      <span className="font-bold text-[16px] text-white">{label}</span>
    </div>
  );
};

export default CustomButton;
