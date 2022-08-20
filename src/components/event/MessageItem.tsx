import React from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';

import Conditional from '@/hocs/Conditional';
import { ChatMessage } from '@/domain/chat/chat-message';

interface MessageItemProps {
  message: ChatMessage;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  return (
    <div className="flex flex-row max-w-[100vw] p-[12px] items-center overflow-hidden">
      <div className="flex h-full mr-[6px] items-start">
        <Conditional condition={message.sender.profileImage !== null}>
          <Image
            className="rounded-[100%]"
            src={message.sender.profileImage?.url ?? ''}
            width={50}
            height={50}
            alt=""
          />
        </Conditional>

        <Conditional condition={message.sender.profileImage === null}>
          <div className="w-[50px] h-[50px] rounded-[100%] bg-mint" />
        </Conditional>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex flex-row items-end">
          <span className="flex font-[600] max-w-[calc(100vw-140px)] text-[14px] text-black overflow-hidden text-ellipsis whitespace-nowrap mr-[4px]">
            {message.sender.nickname}
          </span>

          <span className="sticky right-0 flex font-[400] text-[10px] text-lightGray">
            {dayjs(message.createdAt).format('YYYY.MM.DD')}
          </span>
        </div>

        <span className="font-[400] w-[calc(100vw-80px)] text-[14px] text-black mt-[6px] break-words">
          {message.message}
        </span>
      </div>
    </div>
  );
};

export default MessageItem;
