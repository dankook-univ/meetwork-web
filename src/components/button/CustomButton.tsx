import React, { useCallback } from 'react';

interface CustomButtonProps {
  style?: React.HTMLAttributes<JSX.IntrinsicElements['div']>['className'];
  textStyle?: React.HTMLAttributes<JSX.IntrinsicElements['span']>['className'];
  label: string;
  onClick?: () => void;
  disable?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  style,
  textStyle,
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
      <span className={`font-[600] text-[16px] text-white ${textStyle}`}>
        {label}
      </span>
    </div>
  );
};

export default CustomButton;
