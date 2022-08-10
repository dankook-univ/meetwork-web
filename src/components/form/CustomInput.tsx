import React, { useCallback, useMemo } from 'react';

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
  const textAlign = useMemo(() => `text-${align}`, [align]);

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      setValue(event.target.value);
    },
    [setValue],
  );

  return (
    <input
      className={`flex w-full h-[44px] border-b-[1px] border-b-lightGray focus:outline-none caret-primary bg-white font-[400] text-[20px] text-black ${textAlign}`}
      type="text"
      value={value}
      onChange={handleOnChange}
    />
  );
};

export default CustomInput;
