import React, { useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { ChatRoom } from '@/domain/chat/chat-room';

interface ChannelItemProps {
  channel: ChatRoom;
  onClick?: (eventId: string, roomId: string) => void;
  disable?: boolean;
}

const ChannelItem: React.FC<ChannelItemProps> = ({
  channel,
  onClick,
  disable = false,
}) => {
  const router = useRouter();

  const handleOnClick = useCallback(async () => {
    if (!disable) {
      const { id } = router.query as { id: string };

      if (onClick) {
        await onClick(id, channel.id);
      }

      await router.push(`/event/${id}/channel/${channel.id}`);
    }
  }, [disable, router, onClick, channel.id]);

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
