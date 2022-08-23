import React, { useCallback, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

import { Post } from '@/domain/post';
import Conditional from '@/hocs/Conditional';

interface PostItemProps {
  post: Post;
}

const imageReg =
  /!\[post_image]\(https:\/\/kr.object.ncloudstorage.com\/meetwork\/post\/[a-zA-Z0-9\-]+.(jpeg|png|jpg|gif)\)/g;

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const router = useRouter();

  const content = useMemo<string>(
    () => post.content.replace(imageReg, '').trim(),
    [post.content],
  );

  const handleInfo = useCallback(async () => {
    await router.push(`${router.asPath}/${post.id}`);
  }, [post.id, router]);

  return (
    <div
      className="flex flex-col p-[12px] border-b-[1px] border-b-gray cursor-pointer"
      onClick={handleInfo}
    >
      <header className="flex flex-row mb-[12px] items-center">
        <div className="flex mr-[6px]">
          <Conditional condition={!!post.writer.profileImage}>
            <Image
              className="rounded-[100%] object-cover"
              src={post.writer.profileImage?.url ?? ''}
              width={40}
              height={40}
              alt=""
            />
          </Conditional>

          <Conditional condition={!post.writer.profileImage}>
            <div className="flex w-[40px] h-[40px] rounded-[100%] bg-mint" />
          </Conditional>
        </div>

        <div className="flex flex-col">
          <span className="font-[400] text-[14px] text-black">
            {post.writer.nickname}
          </span>
          <span className="font-[400] text-[14px] text-gray">
            {dayjs(post.createdAt).format('YYYY.MM.DD HH:mm')}
          </span>
        </div>
      </header>

      <p className="font-[400] text-[16px] text-black whitespace-pre-wrap">
        {content}
      </p>
    </div>
  );
};

export default PostItem;
