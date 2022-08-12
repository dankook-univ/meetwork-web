import React, { useCallback, useMemo } from 'react';
import Image, { ImageProps } from 'next/image';

import Conditional from '@/hocs/Conditional';

interface AccountInfoInputProps<T> {
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
  error?: boolean;
  style?: React.HTMLAttributes<JSX.IntrinsicElements['div']>['className'];
  icon?: ImageProps;
  placeholder?: string;
}

const AccountInfoInput = <T extends string>({
  value,
  setValue,
  error = false,
  style,
  icon,
  placeholder,
}: AccountInfoInputProps<T>) => {
  const errorStyle = useMemo<
    React.HTMLAttributes<JSX.IntrinsicElements['div']>['className']
  >(
    () =>
      error && value.length !== 0
        ? `border-[1px] border-rose-500`
        : `border-[1px] border-transparent`,
    [value, error],
  );

  const handleOnChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setValue(e.currentTarget?.value as T);
    },
    [setValue],
  );

  return (
    <div
      className={`flex w-full px-[22px] py-[14px] rounded-[50px] items-center bg-white/40 ${errorStyle} ${style}`}
    >
      <Conditional condition={!!icon}>
        <div className="flex mr-[14px]">
          <Image {...icon!} alt="" />
        </div>
      </Conditional>

      <input
        className="bg-transparent focus:outline-none caret-mint font-normal text-[14px] text-white placeholder:font-normal placeholder:font-[14px] placeholder:text-white"
        value={value}
        onChange={handleOnChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default AccountInfoInput;
