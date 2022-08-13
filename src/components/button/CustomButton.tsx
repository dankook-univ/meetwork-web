import React, { useCallback } from 'react';
import classNames from 'classnames';

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
      className={classNames(
        `flex p-[10px] border border-white items-center justify-center`,
        style,
      )}
      onClick={handleOnClick}
    >
      <span className={`font-[600] text-[16px] ${textStyle}`}>{label}</span>
    </div>
  );
};

export default CustomButton;
