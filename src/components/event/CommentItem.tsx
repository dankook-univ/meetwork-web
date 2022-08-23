import React, { useCallback } from 'react';
import Image from 'next/image';
import useSWR from 'swr';

import { MeetworkApi } from '@/operations';
import { Comment } from '@/domain/post/comment';
import Conditional from '@/hocs/Conditional';

interface CommentItemProps {
  eventId: string;
  postId: string;
  comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({
  eventId,
  postId,
  comment,
}) => {
  const { data: me } = useSWR(['/api/event/me', eventId], () =>
    MeetworkApi.event.getProfile(eventId),
  );
  const { mutate } = useSWR(['/api/post', postId], () =>
    MeetworkApi.post.get(postId),
  );

  const handleDelete = useCallback(async () => {
    await MeetworkApi.comment.delete(comment.id);
    await mutate();
  }, [comment.id, mutate]);

  return (
    <div className="flex flex-col p-[16px] border-b-[1px] border-b-gray">
      <header className="flex flex-row mb-[12px] items-center">
        <div className="flex mr-[6px]">
          <Conditional condition={!!comment.writer.profileImage}>
            <Image
              className="rounded-[100%] object-cover"
              src={comment.writer.profileImage?.url ?? ''}
              width={30}
              height={30}
              alt=""
            />
          </Conditional>

          <Conditional condition={!comment.writer.profileImage}>
            <div className="flex w-[30px] h-[30px] rounded-[100%] bg-mint" />
          </Conditional>
        </div>

        <div className="flex flex-1 flex-row justify-between">
          <span className="font-[400] text-[14px] text-black">
            {comment.writer.nickname}
          </span>

          <Conditional condition={comment.writer.id === me?.id}>
            <Image
              src="/icons/x-circle.svg"
              width={20}
              height={20}
              alt=""
              onClick={handleDelete}
            />
          </Conditional>
        </div>
      </header>

      <p className="font-[400] text-[16px] text-black whitespace-pre-wrap">
        {comment.content}
      </p>
    </div>
  );
};

export default CommentItem;
