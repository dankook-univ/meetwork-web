import React from 'react';
import Image from 'next/image';

interface CreateEventButtonProps {
  onClick: () => void;
}

const CreateEventButton: React.FC<CreateEventButtonProps> = ({ onClick }) => {
  return (
    <div
      className="flex w-[24px] h-[24px] items-center justify-center"
      onClick={onClick}
    >
      <Image
        src="/icons/plus.svg"
        width={24}
        height={24}
        color="#FCFCFC"
        alt=""
      />
    </div>
  );
};

export default CreateEventButton;
