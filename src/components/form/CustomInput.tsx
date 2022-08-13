import React, { useCallback } from 'react';
import classNames from 'classnames';

interface CustomInputProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  align?: 'left' | 'center';
  textStyle?: React.HTMLAttributes<JSX.IntrinsicElements['input']>['className'];
}

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  setValue,
  placeholder = '',
  align = 'left',
  textStyle = '',
}) => {
  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      setValue(event.target.value);
    },
    [setValue],
  );

  return (
    <input
      className={classNames(
        `flex w-full h-[44px] border-b-[1px] border-b-lightGray focus:outline-none caret-primary bg-white font-[400] text-[20px] text-black`,
        ` text-${align}`,
        textStyle,
      )}
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={handleOnChange}
    />
  );
};

export default CustomInput;
