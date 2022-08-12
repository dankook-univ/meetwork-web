import React, { useCallback } from 'react';
import Conditional from '@/hocs/Conditional';

interface CustomInputProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  align?: 'left' | 'center';
}

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  setValue,
  align = 'left',
}) => {
  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      setValue(event.target.value);
    },
    [setValue],
  );

  return (
    <>
      <Conditional condition={align === 'left'}>
        <input
          className={`flex w-full h-[44px] border-b-[1px] border-b-lightGray focus:outline-none caret-primary bg-white font-[400] text-[20px] text-black`}
          type="text"
          value={value}
          onChange={handleOnChange}
        />
      </Conditional>

      <Conditional condition={align === 'center'}>
        <input
          className={`flex w-full h-[44px] border-b-[1px] border-b-lightGray focus:outline-none caret-primary bg-white font-[400] text-[20px] text-black text-center`}
          type="text"
          value={value}
          onChange={handleOnChange}
        />
      </Conditional>
    </>
  );
};

export default CustomInput;
