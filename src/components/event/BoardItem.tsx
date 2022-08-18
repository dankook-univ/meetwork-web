import React, { useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Board } from '@/domain/board';

interface BoardItemProps {
  board: Board;
}

const BoardItem: React.FC<BoardItemProps> = ({ board }) => {
  const router = useRouter();

  const handleOnClick = useCallback(async () => {
    const { id } = router.query as { id: string };
  }, [board.id, router]);

  return (
    <div
      className="flex flex-1 flex-row px-[16px] py-[14px] items-center"
      onClick={handleOnClick}
    >
      <Image src="/icons/list.svg" width={24} height={24} alt="" />

      <span className="font-[400] text-[16px] text-black ml-[12px]">
        {board.name}
      </span>
    </div>
  );
};

export default BoardItem;
