import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import { MeetworkApi } from '@/operations';

interface InputMessageProps {
  eventId: string;
  channelId: string;
}

const InputMessage: React.FC<InputMessageProps> = ({ eventId, channelId }) => {
  const [message, setMessage] = useState<string>('');

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMessage(event.target.value.trim());
    },
    [setMessage],
  );

  const handleOnClick = useCallback(async () => {
    await MeetworkApi.chat.sendMessage(eventId, channelId, { message });

    setMessage('');
  }, [eventId, channelId, message, setMessage]);

  return (
    <div className="flex flex-row p-[24px] rounded-t-[15px] border-t-[1px] border-t-lightGray justify-between">
      <input
        className="flex flex-1 bg-transparent focus:outline-none caret-pink font-normal text-[14px] text-black placeholder:font-normal placeholder:font-[14px] placeholder:text-gray mr-[8px]"
        placeholder="메시지 보내기"
        value={message}
        onChange={handleOnChange}
      />

      <div
        className="w-[24px] h-[24px] items-center justify-center"
        onClick={handleOnClick}
      >
        <Image src="/icons/arrow-up-circle.svg" width={24} height={24} alt="" />
      </div>
    </div>
  );
};

export default InputMessage;
