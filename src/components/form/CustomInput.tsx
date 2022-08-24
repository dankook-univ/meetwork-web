import React, { useCallback } from 'react';
import classNames from 'classnames';

interface CustomInputProps {
  value: string;
  setValue: (
    value: string,
  ) => void | React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  align?: 'left' | 'center';
  textStyle?: React.HTMLAttributes<JSX.IntrinsicElements['input']>['className'];
  avoidSpace?: boolean;
  error?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  setValue,
  placeholder = '',
  align = 'left',
  textStyle = '',
  avoidSpace = false,
  error = false,
}) => {
  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      setValue(
        avoidSpace
          ? event.target.value.trimStart().replace(' ', '-')
          : event.target.value.trimStart(),
      );
    },
    [avoidSpace, setValue],
  );

  return (
    <input
      className={classNames(
        `flex w-full h-[44px] border-b-[1px] focus:outline-none caret-primary bg-white font-[400] text-[20px] placeholder:font-[400px] placeholder:text-[14px] placeholder:text-gray`,
        'outline-0',
        ` text-${align}`,
        `text-${error ? 'pink' : 'black'}`,
        `border-b-${error ? 'pink' : 'lightGray'}`,
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
