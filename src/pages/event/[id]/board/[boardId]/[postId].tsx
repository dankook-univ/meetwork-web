import React, { useCallback, useMemo } from 'react';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import dayjs from 'dayjs';

import { MeetworkApi } from '@/operations';
import { withAuthSSR } from '@/utils/session/withAuth';
import { Board } from '@/domain/board';

import HeaderBackButton from '@/components/button/HeaderBackButton';
import EventLayout from '@/components/layout/EventLayout';
import Conditional from '@/hocs/Conditional';
import InputCommentMessage from '@/components/event/InputCommentMessage';
import CommentItem from '@/components/event/CommentItem';

interface PostProps {
  eventId: string;
  boardId: string;
  postId: string;
}

const imageReg =
  /!\[post_image]\(https:\/\/kr.object.ncloudstorage.com\/meetwork\/post\/[a-zA-Z0-9\-]+.(jpeg|png|jpg|gif)\)/g;

const Post: NextPage<PostProps> = ({ eventId, boardId, postId }) => {
  const router = useRouter();

  const { data: event } = useSWR(['/api/event', eventId], () =>
    MeetworkApi.event.get(eventId),
  );
  const { data: boards } = useSWR(['/api/board', eventId], () =>
    MeetworkApi.board.list(eventId),
  );
  const { data: post } = useSWR(['/api/post', postId], () =>
    MeetworkApi.post.get(postId),
  );

  const board = useMemo<Board | null>(
    () => boards?.find((it) => it.id === boardId) ?? null,
    [boardId, boards],
  );

  const content = useMemo<string>(
    () => post?.content.replace(imageReg, '').trim() ?? '',
    [post?.content],
  );

  const images = useMemo<string[]>(
    () =>
      post?.content
        .match(imageReg)
        ?.map((image) =>
          image.replace('![post_image](', '').replace(')', ''),
        ) ?? [],
    [post?.content],
  );

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const headerLeft = useMemo<JSX.Element>(
    () => <HeaderBackButton onClick={handleBack} color="white" />,
    [handleBack],
  );

  return (
    <EventLayout
      header={{
        title: board?.name ?? '',
        subTitle: event?.name ?? '',
        titleAlign: 'center',
        textColor: 'white',
        left: headerLeft,
      }}
      footerShown={false}
    >
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col p-[16px] border-b-[1px] border-b-gray">
          <header className="flex flex-row mb-[12px] items-center">
            <div className="flex mr-[6px]">
              <Conditional condition={!!post?.writer.profileImage}>
                <Image
                  className="rounded-[100%] object-cover"
                  src={post?.writer.profileImage?.url ?? ''}
                  width={40}
                  height={40}
                  alt=""
                />
              </Conditional>

              <Conditional condition={!post?.writer.profileImage}>
                <div className="flex w-[40px] h-[40px] rounded-[100%] bg-mint" />
              </Conditional>
            </div>

            <div className="flex flex-col">
              <span className="font-[400] text-[14px] text-black">
                {post?.writer.nickname}
              </span>
              <span className="font-[400] text-[14px] text-gray">
                {dayjs(post?.createdAt).format('YYYY.MM.DD HH:mm')}
              </span>
            </div>
          </header>

          <p className="font-[400] text-[16px] text-black whitespace-pre-wrap">
            {content}
          </p>

          <div className="flex flex-row w-[calc(100vw-32px)] h-[140px] mt-[16px] items-center overflow-y-auto overflow-x-auto overscroll-x-contain scrollbar-hide">
            {images.map((image, index) => (
              <div key={index} className="flex-none mr-[16px]">
                <Image
                  className="object-cover"
                  src={image}
                  width={140}
                  height={140}
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          {post?.comments.map((comment) => (
            <CommentItem
              key={comment.id}
              eventId={eventId}
              postId={postId}
              comment={comment}
            />
          ))}
        </div>

        <InputCommentMessage postId={postId} />
      </div>
    </EventLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withAuthSSR(
  async (context: GetServerSidePropsContext) => {
    const { id, boardId, postId } = (await context.query) as {
      id: string;
      boardId: string;
      postId: string;
    };

    return {
      props: {
        eventId: id,
        boardId,
        postId,
      },
    };
  },
);

export default Post;
