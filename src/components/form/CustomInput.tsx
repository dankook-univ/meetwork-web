import React from 'react';
import Image, { ImageProps } from 'next/image';

import Conditional from '@/hocs/Conditional';

interface CustomInputProps {
  style?: React.HTMLAttributes<JSX.IntrinsicElements['div']>['className'];
  icon?: ImageProps;
  placeholder?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  style,
  icon,
  placeholder,
}) => {
  return (
    <div
      className={`flex w-full px-[22px] py-[14px] rounded-[50px] items-center bg-white/40 ${style}`}
    >
      <Conditional condition={!!icon}>
        <div className="flex mr-[14px]">
          <Image {...icon!} alt="" />
        </div>
      </Conditional>

      <input
        className="bg-transparent focus:outline-none caret-mint font-normal text-[14px] text-white placeholder:font-normal placeholder:font-[14px] placeholder:text-white"
        placeholder={placeholder}
      />
    </div>
  );
};

export default CustomInput;
