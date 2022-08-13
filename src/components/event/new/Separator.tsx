import React from 'react';

interface SeparatorProps {
  label: string;
}

const Separator: React.FC<SeparatorProps> = ({ label }) => {
  return (
    <div className="flex px-[22px] py-[7px] bg-gray">
      <span className="font-[400] text-[14px] text-black">{label}</span>
    </div>
  );
};

export default Separator;
