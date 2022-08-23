import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import useSWR from 'swr';

import { MeetworkApi } from '@/operations';

interface InputCommentMessageProps {
  postId: string;
}

const InputCommentMessage: React.FC<InputCommentMessageProps> = ({
  postId,
}) => {
  const [message, setMessage] = useState<string>('');

  const { mutate } = useSWR(['/api/post', postId], () =>
    MeetworkApi.post.get(postId),
  );

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMessage(event.target.value);
    },
    [setMessage],
  );

  const handleOnSubmit = useCallback(async () => {
    await MeetworkApi.comment.create({ postId, content: message });
    await mutate();

    setMessage('');
  }, [postId, message, mutate]);

  return (
    <div className="sticky bottom-0 flex flex-row w-screen min-h-[74px] px-[24px] rounded-t-[15px] border-t-[1px] border-t-lightGray items-center justify-between bg-white">
      <input
        className="flex flex-1 bg-transparent focus:outline-none caret-pink font-normal text-[14px] text-black placeholder:font-normal placeholder:font-[14px] placeholder:text-gray mr-[8px]"
        placeholder="댓글 작성하기"
        value={message}
        onChange={handleOnChange}
      />

      <div
        className="w-[24px] h-[24px] items-center justify-center"
        onClick={handleOnSubmit}
      >
        <Image src="/icons/arrow-up-circle.svg" width={24} height={24} alt="" />
      </div>
    </div>
  );
};

export default InputCommentMessage;
