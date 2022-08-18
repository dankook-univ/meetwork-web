import React, { useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { ChatRoom } from '@/domain/chat/chat-room';

interface ChannelItemProps {
  channel: ChatRoom;
}

const ChannelItem: React.FC<ChannelItemProps> = ({ channel }) => {
  const router = useRouter();

  const handleOnClick = useCallback(async () => {
    const { id } = router.query as { id: string };

    await router.push(`/event/${id}/channel/${channel.id}`);
  }, [channel.id, router]);

  return (
    <div
      className="flex flex-row px-[16px] py-[14px] items-center"
      onClick={handleOnClick}
    >
      <Image src="/icons/channel.svg" width={24} height={24} alt="" />

      <span className="font-[400] text-[16px] text-black ml-[12px]">
        {channel.name}
      </span>
    </div>
  );
};

export default ChannelItem;
