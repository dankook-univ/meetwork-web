import React from 'react';
import { ChatRoom } from '@/domain/chat/chat-room';
import Image from 'next/image';

interface ChannelItemProps {
  channel: ChatRoom;
}

const ChannelItem: React.FC<ChannelItemProps> = ({ channel }) => {
  return (
    <div className="flex flex-1 flex-row px-[16px] py-[14px] items-center">
      <Image src="/icons/channel.svg" width={24} height={24} alt="" />

      <span className="font-[400] text-[16px] text-black ml-[12px]">
        {channel.name}
      </span>
    </div>
  );
};

export default ChannelItem;
